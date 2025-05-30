import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton, IonButton } from "@ionic/react";
import { promociones, combos } from "../data/example"; // Asegúrate de importar combos
import { useState } from "react";
import { ProductoCard, ComboCard } from "../components/card-promociones";
import { useParams } from "react-router";

export default function PromocionesID({ onScroll }: PageProps) {
    const { id } = useParams<{ id: string }>();
    // Filtrar datos según la selección
    const filteredData = combos;

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

                </div>
            </main>
            <Footer />
        </IonContent>
    )
}