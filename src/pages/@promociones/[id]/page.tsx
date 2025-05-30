import { PageProps } from "@/utils/types/page";
import { IonContent, IonSegment, IonLabel, IonSegmentButton, IonButton, IonCol, IonGrid, IonRow, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetArticulosQuery } from "@/hooks/reducers/api_int";
import { LoadingScreen } from "@/template/loading-screen";
import { Star, Truck, ShieldCheck, CloudDownload, ScanBarcode, ShieldAlert } from "lucide-react";

export default function PromocionesID({ onScroll }: PageProps) {
    const { id } = useParams<{ id: string }>();

    const [variants, setVariants] = useState<any[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
    // Filtrar datos según la selección
    const { data, isFetching, error } = useGetArticulosQuery({
        page: 1,
        filtro: id,
        listaPrecio: '(Precio Lista)'
    });
    // Modificar useEffect para cargar todas las variantes
    useEffect(() => {
        if (data) {
            const mappedProducts = data.precios.map((rows: any) => rows);
            setVariants(mappedProducts);
            setSelectedVariant(mappedProducts[0] || null);
        }
    }, [data, id]);

    if (isFetching) {
        return <LoadingScreen />;
    }

    if (error || !selectedVariant) {
        return (
            <IonPage>
                <IonContent className="ion-padding" fullscreen>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center text-red-500">
                            <ShieldAlert className="h-12 w-12 mx-auto" />
                            <p className="mt-4">Error cargando el producto</p>
                            <IonButton
                                onClick={() => window.location.reload()}
                                className="mt-4"
                            >
                                Reintentar
                            </IonButton>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">

                <div className="max-w-6xl mx-auto">
                    <IonGrid>
                        <IonRow>
                            {selectedVariant.image && (
                                <IonCol size="12" sizeMd="6">
                                    <img
                                        src={selectedVariant.image || "/placeholder.svg"} // Usar imagen del selectedVarianto
                                        alt={selectedVariant.nombre} // Alt dinámico
                                        className="w-full h-full bg-slate-100 rounded-lg"
                                    />
                                    {/* Mostrar descuento si existe */}
                                    {selectedVariant.descuento && (
                                        <div className="absolute top-2 left-2 bg-purple-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {selectedVariant.descuento}% OFF
                                        </div>
                                    )}
                                </IonCol>
                            )}

                            <IonCol>
                                <div>
                                    <h1 style={{ margin: 0 }}>{selectedVariant.nombre}</h1>
                                    <div className="flex items-center gap-2">
                                        {/* Sección de reviews (mantenemos estática ya que no está en la interfaz) */}
                                        {[...Array(3)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                                        ))}
                                        {[...Array(2)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                        ))}
                                        (2 reseñas)
                                    </div>

                                    {/* Precio con descuento si aplica */}
                                    <div>
                                        {selectedVariant.precioRegular ? (
                                            <>
                                                <h2 className="text-red-500">
                                                    ${selectedVariant.precio.toFixed(2)}
                                                    <span className="text-gray-400 line-through ml-2">
                                                        ${selectedVariant.precioRegular.toFixed(2)}
                                                    </span>
                                                </h2>
                                            </>
                                        ) : (
                                            <h2>${selectedVariant.precio.toFixed(2)}</h2>
                                        )}
                                    </div>

                                    <p style={{ color: '#666' }}>
                                        {/* Descripción (agregar campo si es necesario) */}
                                        {selectedVariant.categoria}
                                    </p>
                                </div>

                                {/* Resto del maquetado se mantiene igual */}
                                <ul className="items-center gap-2 w-full">
                                    {selectedVariant.unidad === "Caja" && (
                                        <li className="items-center">
                                            La caja contiene - {selectedVariant.factor} pieza(s)
                                        </li>
                                    )}
                                    {variants.length > 1 && (
                                        <IonSegment
                                            value={selectedVariant?.id}
                                            onIonChange={(e) => {
                                                const selected = variants.find(v => v.id === e.detail.value);
                                                setSelectedVariant(selected || null);
                                            }}
                                            className="my-4"
                                        >
                                            {variants.map((variant) => (
                                                <IonSegmentButton
                                                    key={variant.id}
                                                    value={variant.id}
                                                    className="text-sm"
                                                >
                                                    <IonLabel>
                                                        {variant.unidad} - ${variant.precio.toFixed(2)}
                                                        {variant.factor && variant.factor > 1 && ` (${variant.factor} pzs)`}
                                                    </IonLabel>
                                                </IonSegmentButton>
                                            ))}
                                        </IonSegment>
                                    )}

                                </ul>

                                <IonGrid>
                                    <IonRow className="gap-y-4 md:gap-y-0 p-2 md:p-0">
                                        <IonCol
                                            size="12"
                                            size-sm="4"
                                            className="flex items-center gap-2 md:gap-3 flex-grow"
                                        >
                                            <Truck className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                                            <span className="text-sm md:text-base whitespace-nowrap">Envío Gratis</span>
                                        </IonCol>

                                        <IonCol
                                            size="12"
                                            size-sm="4"
                                            className="flex items-center gap-2 md:gap-3 flex-grow"
                                        >
                                            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                                            <span className="text-sm md:text-base whitespace-nowrap">Garantía de 1 Año</span>
                                        </IonCol>

                                        <IonCol
                                            size="12"
                                            size-sm="4"
                                            className="flex items-center gap-2 md:gap-3 flex-grow"
                                        >
                                            <CloudDownload className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                                            <span className="text-sm md:text-base whitespace-nowrap">Devoluciones Fáciles</span>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>

                                <IonSegment value="details">
                                    <IonSegmentButton value="details">
                                        <IonLabel>Detalles</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="specifications">
                                        <IonLabel>Especificaciones</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="reviews">
                                        <IonLabel>Reseñas</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>

                                <ul className="mt-5">
                                    <li className="flex items-center text-sm gap-1">
                                        <ScanBarcode className="h-4 w-4 fill-[#8B5CF6]" />
                                        Codigo de barras:
                                        <span className="text-[#8B5CF6]">{id}</span>
                                    </li>
                                </ul>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </main>
        </IonContent>
    )
}