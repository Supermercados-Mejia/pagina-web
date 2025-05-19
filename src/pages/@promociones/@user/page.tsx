import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton } from "@ionic/react";
import { promociones, combos } from "../data/example"; // Asegúrate de importar combos
import { useState } from "react";
import { ProductoCard, ComboCard } from "../components/card-promociones"; // Importa ambos componentes
import PromoBanner from "../components/banner-offers";
import { promoItems } from "@/pages/@promociones/data/promo";

export default function PromocionesUser({ onScroll }: PageProps) {
    const [selectedType, setSelectedType] = useState<string>('todo');

    // Filtrar datos según la selección
    const filteredData =
        selectedType === 'todo'
            ? [...combos, ...promociones]
            : selectedType === 'combos'
                ? combos
                : promociones;

    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader
                collapse="condense"
                className="custom-toolbar z-50 -top-16">
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">

                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Promociones</h1>
                        <PromoBanner items={promoItems} autoPlay={true} interval={3000} showControls={true} showIndicators={true} />

                        <div className="space-y-1">
                            <p className="text-gray-600 text-lg">Conoce nuestro nuevo catalogo</p>
                            <p className="text-gray-600 text-lg">Aprovecha nuestras ofertas y combos.</p>
                        </div>
                    </header>

                    <div className="max-w-2xl mx-auto mb-8">
                        <IonSegment
                            value={selectedType}
                            onIonChange={(e: any) => setSelectedType(e.detail.value!)}
                        >
                            <IonSegmentButton value="todo">
                                <IonLabel>Todo</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="combos">
                                <IonLabel>Combos</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="promociones">
                                <IonLabel>Promociones</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>

                    <section aria-labelledby="promotions-heading" className="mt-6">
                        <h2 id="promotions-heading" className="sr-only">Promociones y Combos</h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData.length ?
                                filteredData.map((item: any, index) => (
                                    item.nombreCombo ? // Detecta si es un combo
                                        <ComboCard combo={item} index={index} key={index} />
                                        : <ProductoCard promocion={item} index={index} key={index} />
                                ))
                                : (
                                    <li className="m-auto list-none col-span-3">
                                        Actualmente no hay promociones disponibles, vuelve en otro momento.
                                    </li>
                                )
                            }
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>
    )
}