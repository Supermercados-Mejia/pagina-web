import { Producto } from "@/utils/types/page";
import { motion } from "framer-motion";
import ModalProd from "./modal-product";
import { Barcode, Hash, Heart, ReceiptText } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/functions/local-storage";
import { cn } from "@/utils/functions/cn";
import { useIonModal } from "@ionic/react";
import { formatValue } from "@/utils/constants/format-values";
import { useGetWithFiltersGeneralMutation } from "@/hooks/reducers/api";
import { EnvConfig } from "@/utils/constants/env.config";
import { IconLiz } from "@/template/icon-liz";

interface ProductCardProps {
    producto: Producto;
}
const { hubs: apiUrl } = EnvConfig();

const Card: React.FC<ProductCardProps> = ({ producto }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [image, setImage] = useState("");
    const [getWithFilter] = useGetWithFiltersGeneralMutation();
    const isLowStock = producto.cantidad > 0 && producto.cantidad <= 10;
    const isOutOfStock = producto.cantidad <= 0;

    // Price calculations
    const { discountPercentage } = useMemo(() => {
        const percentage = producto.descuento
            ? ((producto.precio - producto.descuento) / producto.precio) * 100
            : 0;
        let roundedDiscount = Math.round(percentage);
        return { discountPercentage: roundedDiscount };
    }, [producto.precio, producto.precioRegular, producto.descuento]);

    const handleFavoriteToggle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Prevenir que se abra el modal
        const favorites = getLocalStorageItem("favoritos") || [];
        const JSONfavorites = typeof favorites === "string" ? JSON.parse(favorites) : favorites;

        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = JSONfavorites.filter((fav: any) => fav.id !== producto.id);
        } else {
            updatedFavorites = [...JSONfavorites, producto];
        }

        setLocalStorageItem("favoritos", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    }, [isFavorite, producto]);

    async function LoadImage() {
        const response = await getWithFilter({
            table: `imagenes
                    left join articulos on articulos.id = imagenes.id_ref`,
            pageSize: 10,
            page: 1,
            tag: 'Productos',
            filtros: {
                "Filtros": [
                    {
                        "Key": "articulo",
                        "Value": producto.articulo,
                        "Operator": "="
                    },
                    {
                        "Key": "tabla",
                        "Value": "articulos",
                        "Operator": "="
                    }
                ],
                "Selects": [
                    { key: "articulos.id" },
                    { key: "articulos.nombre" },
                    { key: "articulos.descripcion" },
                    { key: "articulos.precio" },
                    { key: "imagenes.url" }
                ]
            }
        }).unwrap();

        if (response && response.data) {
            response.data.map((item: any) => {
                setImage(apiUrl.slice(0, -1) + item.url);
            });
        }
    }
    // Corrección: pasar las opciones del modal al presentarlo
    const [present, dismiss] = useIonModal(ModalProd, {
        producto,
        image,
        handleFavoriteToggle,
        isFavorite,
        onDismiss: () => dismiss(),
    });

    const handleCardClick = () => {
        present({
            initialBreakpoint: 0.95,
            breakpoints: [0, 0.5, 0.95],
        });
    };

    useEffect(() => {
        const favorites = getLocalStorageItem("favoritos") || [];
        const JSONfavorites = typeof favorites === "string" ? JSON.parse(favorites) : favorites;
        setIsFavorite(JSONfavorites.some((fav: any) => fav.id === producto.id));
        LoadImage();
    }, [producto.id]);

    // card.tsx - REEMPLAZAR la función formatearStock actual
    const formatearStock = (cantidad: number, unidad: string, factor: number = 1) => {
        // Para unidades como Kilogramo, mostrar con decimales
        if (/kilo|kg/i.test(unidad)) {
            return unidad !== 'Pieza'
                ? (factor ? (cantidad / factor).toFixed(2) : cantidad.toFixed(2))
                : cantidad.toFixed(0);
        } else {
            return unidad !== 'Pieza'
                ? (factor ? Math.trunc(cantidad / factor) : Math.trunc(cantidad))
                : Math.trunc(cantidad);
        }
    };
    const stok = formatearStock(producto.cantidad, producto.unidad, producto.factor);
    const stokNumeric = Number(stok);
    if (!isNaN(stokNumeric) && stokNumeric <= 0 && !isOutOfStock) {
        return null; // No renderizar la tarjeta si el stock es 0 o menos
    }
    return (
        <motion.article
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleCardClick}
            className="group relative min-w-52 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">

            <section
                className="relative border-b border-gray-200 overflow-hidden">
                {image ?
                    (<img
                        src={image ? image : "/logo.jpg"}
                        alt="Product Image"
                        className=" h-52 mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />) :
                    (<IconLiz fill="#DBDBDB" />)}
            </section>

            <section className="p-4 min-h-24 bg-white">
                <label className="font-semibold text-sm">{producto.nombre}</label>
                <p className="text-xs text-gray-500 flex items-center justify-between"> {producto.categoria}</p>
            </section>

            <footer className="mt-auto w-full bg-white border-t border-gray-100">
                <div className="flex flex-col justify-between px-4 py-4 gap-2">
                    {/* ---- PRECIO ---- */}
                    <div className="flex flex-col overflow-hidden">
                        {producto.descuento ? (
                            <>
                                <span className="text-lg font-semibold text-purple-600 leading-none truncate">
                                    {formatValue(producto.descuento, "currency")}
                                </span>
                                <span className="text-[11px] text-red-500 line-through truncate leading-none">
                                    {formatValue(producto.precio, "currency")}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-semibold text-purple-600 leading-none truncate">
                                {formatValue(producto.precio, "currency")}
                            </span>
                        )}
                    </div>
                </div>
            </footer>

        </motion.article >
    );
};

export default Card;