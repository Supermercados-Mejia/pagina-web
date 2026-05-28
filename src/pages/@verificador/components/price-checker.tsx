import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IonItem, IonLabel, IonList, IonSpinner, IonSelect, IonSelectOption, IonProgressBar } from "@ionic/react";
import { ScanBarcode, Search, ShoppingBasket } from "lucide-react";
import { Product } from "@/utils/data/example-data";
import { useGetWithFiltersGeneralInIntelisisMutation } from "@/hooks/reducers/api_int";

type Sucursal = {
    id: string;
    nombre: string;
    almacen: string;
    sucursal: string;
};

const sucursales: Sucursal[] = [
    { id: "(Precio Lista)", nombre: "Mayoreo", almacen: "ALMMAYO", sucursal: "4" },
    { id: "(Precio 4)", nombre: "Valle de las Palmas", almacen: "ALMPALM", sucursal: "3" },
    { id: "(Precio 2)", nombre: " Valle de Guadalupe Liz", almacen: "ALMVGPE", sucursal: "1" },
    { id: "(Precio 3)", nombre: "Testerazo", almacen: "ALMTEST", sucursal: "2" },
];

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className = "", ...props }, ref: any) => {

        const combinedRef = useCallback(
            (element: HTMLInputElement) => {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
                if (typeof ref === "function") {
                    ref(element);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
                }
            },
            [ref]
        );

        useEffect(() => {
            if (!ref) return;
            if (ref.current) {
                ref.current.focus();
            }
            ref ?? handleFocusLoss(ref);
        }, [ref]);

        return (
            <input
                ref={combinedRef}
                className={`w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
                {...props}
            />
        );
    }
);

const handleFocusLoss = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
        ref.current.focus();
    }
};

const COOLDOWN_TIME = 5000;
const DEBOUNCE_TIME = 500;

// ← ÚNICO CAMBIO: prop opcional para notificar al padre qué sucursal se eligió
function PriceChecker({ onSucursalChange }: { onSucursalChange?: (s: Sucursal) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayData, setDisplayData] = useState<Product[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const [selectedSucursal, setSelectedSucursal] = useState(sucursales[2]);
    const [productNotFound, setProductNotFound] = useState(false);
    const [getProgress, setProgress] = useState(0);
    const timeoutRef = useRef<number>(null);
    const inputValueRef = useRef<number>(null);

    const [getData, { isLoading }] = useGetWithFiltersGeneralInIntelisisMutation();
    const [fetchedItems, setFetchedItems] = useState<any[]>([]);

    const resetStates = () => {
        setDisplayData([]);
        setInputValue("");
        setProductNotFound(false);
        setProgress(0);
        setFetchedItems([]);
    };

    const resetCooldownTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(resetStates, COOLDOWN_TIME);
    };

    const buildSearchQuery = useCallback((lista: any, codigo: string) => {
        return `CB AS cb INNER JOIN art ON art.Articulo = cb.Cuenta INNER JOIN ListaPreciosDUnidad AS lpu ON art.Articulo = lpu.Articulo AND lpu.Lista = '${lista.id}' AND lpu.Precio > 0 AND lpu.unidad = cb.Unidad LEFT JOIN Oferta AS ofr On ofr.Estatus = 'VIGENTE' AND ofr.Articulo = art.Articulo AND ofr.FechaD < GETDATE() AND ofr.FechaA > GETDATE()  LEFT JOIN OfertaD AS ofrd On ofrd.id = ofr.ID AND ofrd.Articulo = art.Articulo AND ofrd.Unidad = cb.Unidad WHERE CB.Codigo = '${codigo}'`;
    }, []);

    useEffect(() => {
        inputValueRef.current = setTimeout(() => {
            setDebouncedInput(inputValue);
        }, DEBOUNCE_TIME);

        return () => {
            if (inputValueRef.current) clearTimeout(inputValueRef.current);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedInput.length < 3) {
            setFetchedItems([]);
            setDisplayData([]);
            return;
        }

        const fetchProducts = async () => {
            try {
                const result = await getData({
                    table: buildSearchQuery(selectedSucursal, debouncedInput),
                    pageSize: 10,
                    page: 1,
                    filtros: {
                        Selects: [
                            { key: "cb.Codigo" },
                            { key: "art.Descripcion1" },
                            { key: "lpu.Unidad" },
                            { key: "lpu.Precio" },
                            { key: "ofrd.precio", alias: "ofertaPrecio" },
                            { key: "ofrd.porcentaje", alias: "porcentaje" },
                            { key: "ofr.FechaA", alias: "ofertaFechaHasta" },
                        ],
                    },
                    signal: undefined,
                });

                if ('data' in result && result.data?.data) {
                    setFetchedItems(result.data.data);
                } else {
                    setFetchedItems([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setFetchedItems([]);
            } finally {
                document.getElementById("price-checker-input")?.focus();
            }

        };

        fetchProducts();
        resetCooldownTimer();
    }, [debouncedInput, selectedSucursal, getData, buildSearchQuery]);

    useEffect(() => {
        if (fetchedItems.length > 0) {
            const lastItem = fetchedItems[fetchedItems.length - 1];
            const producto: Product = {
                id: lastItem.Codigo,
                nombre: lastItem.Descripcion1 || "Sin nombre",
                precio: lastItem.Precio || 0,
                unidad: lastItem.Unidad || "Unidad",
                categoria: lastItem.Grupo || "Sin categoría",
                oferta: lastItem.ofertaPrecio ? {
                    precio: lastItem.Porcentaje ? lastItem.Precio - ((lastItem.Porcentaje / 100) * lastItem.ofertaPrecio) : lastItem.ofertaPrecio,
                    fechaHasta: lastItem.ofertaFechaHasta
                        ? new Date(lastItem.ofertaFechaHasta).toLocaleDateString()
                        : "",
                } : undefined,
            };
            setDisplayData([producto]);
            setProductNotFound(false);
        } else if (debouncedInput && fetchedItems.length === 0 && !isLoading) {
            setProductNotFound(true);
        } else {
            setProductNotFound(false);
        }
    }, [fetchedItems, debouncedInput, isLoading]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => prev >= 1 ? 1 : prev + 1 / 100);
        }, 50);
        return () => { clearInterval(interval); setProgress(0); };
    }, [displayData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        resetCooldownTimer();
    };

    const handleSucursalChange = (e: CustomEvent) => {
        const nueva = e.detail.value;
        setSelectedSucursal(nueva);
        // ← ÚNICO CAMBIO: avisar al padre la sucursal nueva
        onSucursalChange?.(nueva);
        resetCooldownTimer();
        inputRef ?? handleFocusLoss(inputRef);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    return (
        <div className="mx-auto inset-0 z-20">
            <div className="relative flex max-h-3/4 flex-col justify-start items-center">
                <div className="bg-background w-full sticky">
                    <div className="relative space-y-2">
                        <IonItem>
                            <IonLabel>Sucursal</IonLabel>
                            <IonSelect
                                value={selectedSucursal}
                                onIonChange={handleSucursalChange}
                                interface="popover"
                            >
                                {sucursales.map((sucursal) => (
                                    <IonSelectOption key={sucursal.id} className="ml-2" value={sucursal}>
                                        {sucursal.nombre}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>

                        <div className="relative">
                            <Input
                                id="price-checker-input"
                                ref={inputRef}
                                type="text"
                                placeholder="Escanear código o buscar..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                autoComplete="off"
                                spellCheck="false"
                                className="pl-3 pr-9 text-sm rounded-lg bg-white font-medium text-center"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm absolute top-32 inset-0 mx-auto z-10 mt-2">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full max-h-[500px] overflow-y-auto border rounded-md shadow-lg overflow-hidden bg-white p-4 flex items-center justify-center"
                            >
                                <IonSpinner name="crescent" />
                                <span className="ml-2">Buscando en el catálogo...</span>
                            </motion.div>
                        ) : productNotFound && inputValue ? (
                            <motion.div
                                key="not-found"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full max-h-[500px] overflow-y-auto border rounded-md shadow-lg overflow-hidden bg-white p-4 text-center text-gray-500"
                            >
                                El código de barras "{inputValue}" no existe en el catálogo.
                            </motion.div>
                        ) : displayData.length > 0 ? (
                            <motion.div
                                key="results"
                                className="w-full max-h-[500px] overflow-y-auto border rounded-md shadow-lg overflow-hidden bg-white"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.ul>
                                    {displayData.map((product) => (
                                        <motion.li
                                            key={`${product.id}-${Date.now()}`}
                                            className="px-3 py-2 flex items-center justify-between cursor-pointer rounded-md"
                                            layout
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="p-0 m-0 w-full h-full">
                                                <IonList className="flex items-center gap-2 justify-between flex-1">
                                                    <IonItem lines="none" className="w-full flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                                        <ShoppingBasket
                                                            className="text-purple-600 shrink-0 mr-2"
                                                            aria-hidden="true"
                                                            role="img"
                                                        />
                                                        <section className="flex flex-col gap-1 flex-1 min-w-0">
                                                            <IonLabel className="text-base font-medium text-gray-900 leading-tight">
                                                                <label>
                                                                    {product.nombre?.toLowerCase().split(' ').map(word =>
                                                                        word.charAt(0).toUpperCase() + word.slice(1)
                                                                    ).join(' ')}
                                                                    {product.oferta && (
                                                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                            OFERTA
                                                                        </span>
                                                                    )}
                                                                </label>
                                                                <span className="text-gray-500"> | {product.unidad}</span>
                                                            </IonLabel>

                                                            {product.oferta ? (
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="flex items-baseline gap-2">
                                                                        <span className="text-2xl line-through text-gray-400">
                                                                            ${product.precio.toLocaleString()}
                                                                        </span>
                                                                        <span className="text-4xl font-semibold text-red-600">
                                                                            ${product.oferta.precio.toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-xs text-green-600">
                                                                        Válida hasta: {product.oferta.fechaHasta}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-4xl font-semibold text-purple-700">
                                                                    ${product.precio.toLocaleString()}
                                                                </span>
                                                            )}
                                                            <label className="flex items-center text-sm gap-1">
                                                                <ScanBarcode className="h-4 w-4 fill-[#8B5CF6]" />
                                                                Codigo de barras:
                                                                <span className="text-[#8B5CF6]">{inputValue}</span>
                                                            </label>
                                                            <IonProgressBar
                                                                value={getProgress}
                                                                style={{
                                                                    '--progress-background': '#6b46c1',
                                                                    '--buffer-background': '#e9d8fd',
                                                                    height: '4px',
                                                                    marginTop: '8px'
                                                                }}
                                                            />
                                                        </section>
                                                    </IonItem>
                                                </IonList>
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <div className="bottom-0 mt-2 px-3 py-2 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>Resultados: {displayData.length}</span>
                                        <span>ESC para cancelar</span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default PriceChecker;