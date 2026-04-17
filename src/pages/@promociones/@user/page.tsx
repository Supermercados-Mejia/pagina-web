import { BentoGrid } from "@/components/bento-grid";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonBackButton } from "@ionic/react";
import { useCallback, useEffect, useState, useRef } from "react";
import { useGetWithFiltersGeneralInIntelisisMutation } from "@/hooks/reducers/api_int";
import Card from "../components/card";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/functions/local-storage";
import { Producto } from "@/utils/types/page";
import { useAppSelector } from "@/hooks/selector";
import { RootState } from "@/hooks/store";
import { IconLiz } from "@/template/icon-liz";

// Tipos
interface Sucursal {
    nombre: string;
    precio: string;
    direccion: string;
    coordenadas: [number, number];
}

interface ApiResponse {
    totalRecords: number;
    totalPages: number;
    pageSize: number;
    page: number;
    data: any[];
}
export const sucursalesfind: Sucursal[]
    = [
        { nombre: "Mayoreo", precio: "(Precio Lista)", direccion: "Calle Principal 123", coordenadas: [32.099733119103604, -116.5656031728404] },
        { nombre: "Valle de guadalupe", precio: "(Precio 2)", direccion: "Avenida Norte 456", coordenadas: [32.0947939, -116.5735554] },
        { nombre: "Valle de las palmas", precio: "(Precio 4)", direccion: "Boulevard Sur 789", coordenadas: [32.36670812592066, -116.61484440041006] },
        { nombre: "Testerazo", precio: "(Precio 3)", direccion: "Boulevard Sur 789", coordenadas: [32.295697914465485, -116.53331677806355] },
    ];

// Claves para localStorage
const SUCURSAL_KEY = 'sucursal_seleccionada';
const LISTA_PRECIOS_KEY = 'lista_precios';

const useSucursal = () => {
    const [sucursal, setSucursal] = useState<Sucursal>(() => {
        try {
            const stored = getLocalStorageItem(SUCURSAL_KEY);
            if (stored) {
                const found = sucursalesfind.find(s => s.nombre === stored);
                if (found) return found;
            }
        } catch { }
        return sucursalesfind[0];
    });

    const cambiarSucursal = useCallback((nombre: string) => {
        const nueva = sucursalesfind.find(s => s.nombre === nombre);
        if (nueva) {
            setSucursal(nueva);
            setLocalStorageItem(SUCURSAL_KEY, nueva.nombre);
            setLocalStorageItem(LISTA_PRECIOS_KEY, nueva.precio);
        }
    }, []);

    return { sucursal, cambiarSucursal };
};

const useOfertas = (categoria: string, listaPrecios: string) => {
    const [getData, { isLoading }] = useGetWithFiltersGeneralInIntelisisMutation();
    const [items, setItems] = useState<Producto[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [totalRecords, setTotalRecords] = useState(1);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentCategoriaRef = useRef(categoria);
    const currentListaRef = useRef(listaPrecios);

    const buildTableQuery = useCallback((lista: string, cat: string) => {
        return `art INNER JOIN ListaPreciosDUnidad AS lpu ON art.Articulo = lpu.Articulo AND lpu.Lista = '${lista}' AND lpu.Precio > 0 ${cat && cat !== 'TODO' ? `AND art.Grupo = '${cat}'` : ''} INNER JOIN ArtUnidad AS au ON art.Articulo = au.Articulo AND lpu.Unidad = au.Unidad INNER JOIN ArtDisponible AS ad on art.Articulo = ad.Articulo AND ad.DispMenosApartado > 0 AND (ad.DispMenosApartado / au.Factor) > 0 INNER JOIN ( SELECT *,  ROW_NUMBER() OVER (PARTITION BY Articulo, Unidad ORDER BY id DESC) AS rn FROM OfertaD ) AS ofrd ON ofrd.Articulo = art.Articulo AND ofrd.Unidad = art.Unidad LEFT JOIN Oferta AS ofr ON ofr.ID = ofrd.ID AND ofr.FechaD < GETDATE() AND ofr.FechaA > GETDATE()`;
    }, []);

    const loadOfertas = useCallback(async (currentPage: number, isNewCategory: boolean = false) => {
        if (isFetching) return;
        setIsFetching(true);
        setError(null);
        try {
            const result = await getData({
                table: buildTableQuery(listaPrecios, categoria),
                pageSize: 10,
                page: currentPage,
                filtros: {
                    Filtros: [
                        { key: "ofrd.Precio", Operator: ">", Value: "0" },
                        { key: "ofr.Estatus", Operator: "=", Value: "VIGENTE" }
                    ],
                    Selects: [
                        { key: "art.Articulo" },
                        { key: "art.Grupo" },
                        { key: "art.Descripcion1" },
                        { key: "lpu.Unidad" },
                        { key: "art.Impuesto1" },
                        { key: "art.Impuesto2" },
                        { key: "art.TipoImpuesto1" },
                        { key: "art.TipoImpuesto2" },
                        { key: "lpu.Precio" },
                        { key: "ofrd.Precio", alias: "Descuento" },
                        { key: "ofrd.Porcentaje" },
                        { key: "au.Unidad", alias: "UnidadFactor" },
                        { key: "au.Factor" },
                    ],
                    Agregaciones: [
                        { Key: "ad.DispMenosApartado", Operation: "SUM", Alias: "Cantidad" },
                    ],
                    Order: [{ Key: "Descripcion1", Direction: "DESC" }],
                },
                signal: undefined,
            });

            if ('data' in result && result.data) {
                const apiData: ApiResponse = result.data;
                if (apiData.data && apiData.data.length > 0) {
                    console.log(apiData.data);

                    const mappedItems: Producto[] = apiData.data.map((item: any) => ({
                        id: `${item.Articulo}-${item.Unidad}`,
                        codigo: item.Codigo || "0000",
                        articulo: item.Articulo || "Articulo",
                        nombre: item.Descripcion1 || "Sin nombre",
                        categoria: item.Grupo || "Sin categoría",
                        unidad: item.Unidad || "Unidad",
                        precio: item.Precio || 0,
                        cantidad: item.Cantidad || 1,
                        factor: item.Factor || 1,
                        impuesto1: item.Impuesto1 || 0,
                        impuesto2: item.Impuesto2 || 0,
                        tipoImpuesto1: item.TipoImpuesto1 || 0,
                        tipoImpuesto2: item.TipoImpuesto2 || 0,
                        descuento: item.Porcentaje ? item.Precio - ((item.Porcentaje / 100) * item.Precio) : item.Descuento || 0,
                    }));
                    setTotalRecords(apiData.totalRecords);
                    setItems(prev => currentPage === 1 || isNewCategory ? mappedItems : [...prev, ...mappedItems]);
                    setHasMore(currentPage < apiData.totalPages);
                } else {
                    setHasMore(false);
                }
            }
        } catch (err) {
            setError("Ocurrió un error al cargar los datos");
            setHasMore(false);
        } finally {
            setIsFetching(false);
        }
    }, [categoria, listaPrecios, getData, buildTableQuery]);

    useEffect(() => {
        if (currentCategoriaRef.current !== categoria || currentListaRef.current !== listaPrecios) {
            setItems([]);
            setPage(1);
            setHasMore(true);
            currentCategoriaRef.current = categoria;
            currentListaRef.current = listaPrecios;
            loadOfertas(1, true);
        }
    }, [categoria, listaPrecios, loadOfertas]);

    useEffect(() => {
        loadOfertas(1);
    }, []);

    useEffect(() => {
        if (page > 1) {
            loadOfertas(page);
        }
    }, [page, loadOfertas]);

    const loadMore = useCallback(() => {
        if (!isFetching && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [isFetching, hasMore]);

    return {
        items, hasMore, totalRecords, isLoading: isLoading || isFetching, error, loadMore, reset: () => {
            setItems([]);
            setPage(1);
            setHasMore(true);
            loadOfertas(1, true);
        }
    };
};

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Producto[]>([]);
    const [count, setCount] = useState(0);

    const loadFavorites = useCallback(() => {
        try {
            const stored = getLocalStorageItem("favoritos");
            const parsed = stored ? JSON.parse(stored) : [];
            setFavorites(parsed);
            setCount(parsed.length);
        } catch {
            setFavorites([]);
            setCount(0);
        }
    }, []);

    useEffect(() => {
        loadFavorites();
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "favoritos") loadFavorites();
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [loadFavorites]);

    return { favorites, count, refresh: loadFavorites };
};

const Ofertas: React.FC<PageProps> = ({ onScroll }) => {
    const cat = useAppSelector((state: RootState) => state.filterData);
    const categoria = cat?.key?.value || '';

    const { sucursal, cambiarSucursal } = useSucursal();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const { favorites, refresh: refreshFavorites } = useFavorites();

    const { items: ofertasItems, hasMore, isLoading, error, loadMore, reset } = useOfertas(categoria, sucursal.precio);

    // Lógica de ordenamiento aplicada a los items mostrados
    const baseItems = activeSection === 'favoritos' ? favorites : ofertasItems;
    const displayedItems = [...baseItems].sort((a, b) => {
        if (!sortOrder) return 0;
        return sortOrder === 'asc' ? a.precio - b.precio : b.precio - a.precio;
    });

    const handleSectionChange = useCallback((section: string) => {
        const newSection = activeSection === section ? null : section;
        setActiveSection(newSection);
        if (newSection === 'favoritos') {
            refreshFavorites();
        } else if (activeSection === 'favoritos') {
            reset();
        }
    }, [activeSection, refreshFavorites, reset]);

    const handleInfiniteScroll = useCallback(async (event: any) => {
        if (!hasMore || isLoading || activeSection === 'favoritos') {
            event.target.complete();
            if (!hasMore) event.target.disabled = true;
            return;
        }
        loadMore();
        event.target.complete();
    }, [hasMore, isLoading, activeSection, loadMore]);

    const handleSucursalChange = (nombre: string) => {
        cambiarSucursal(nombre);
        if (activeSection !== 'favoritos') {
            reset();
        }
    };

    const toggleSort = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader collapse="condense" className="custom-toolbar h-fit absolute -top-0">
                <IonToolbar>
                    <a className='decoration-none cursor-pointer' href='/ofertas'>
                        <IconLiz fill={onScroll ? "#FFF" : "#7927F5"} width={55} />
                    </a>
                </IonToolbar>
            </IonHeader>
            <section className="flex my-4">
                <IonBackButton color={"tertiary"} text={"Regresar"} defaultHref="/" />
            </section>
            <section className="px-4 py-4 max-w-6xl mx-auto">
                <section className="sticky top-2 flex flex-wrap items-center gap-2 z-50 bg-white/70 dark:bg-black/70 py-2 px-2 my-4 rounded-lg backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <select
                        value={sucursal.nombre}
                        onChange={(e) => handleSucursalChange(e.target.value)}
                        className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {sucursalesfind.map(s => (
                            <option key={s.nombre} value={s.nombre}>{s.nombre}</option>
                        ))}
                    </select>

                    {/* Botón de Ordenamiento
                    <button
                        onClick={toggleSort}
                        className="flex items-center gap-1 bg-purple-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm font-medium hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <span>Precio</span>
                        {sortOrder === 'asc' ? ' ↑' : sortOrder === 'desc' ? ' ↓' : ' ↕'}
                    </button> */}
                </section>

                {error && (
                    <div className="text-center py-4 text-red-500">
                        <p>{error}</p>
                        <button onClick={reset} className="underline mt-2">Reintentar</button>
                    </div>
                )}

                <IonList className="bg-transparent">
                    <BentoGrid cols={5}>
                        {displayedItems.map((producto, index) => (
                            <Card
                                key={`${producto.id}-${index}`}
                                producto={producto}
                            />
                        ))}
                    </BentoGrid>
                </IonList>

                {isLoading && displayedItems.length === 0 && (
                    <div className="text-center py-4">
                        <p>Cargando ofertas...</p>
                    </div>
                )}

                {!isLoading && displayedItems.length === 0 && (
                    <div className="text-center py-8">
                        <p>No se encontraron elementos</p>
                    </div>
                )}

                <IonInfiniteScroll
                    onIonInfinite={handleInfiniteScroll}
                    threshold="100px"
                    disabled={!hasMore || isLoading || activeSection === "favoritos"}
                >
                    <IonInfiniteScrollContent
                        loadingText={hasMore ? "Cargando más ofertas..." : "No hay más ofertas"}
                    />
                </IonInfiniteScroll>
            </section>
        </IonContent>
    );
};

export default Ofertas;