import MainForm from "@/components/form/main-form";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

import Footer from "@/template/footer";
import { ValoracionesField } from "../utils/valorraciones-field";
import { useState } from "react";
import { EvaluacionField } from "../utils/evaluacion-field";


export default function UserValoraciones({ onScroll }: PageProps) {

    const [selectedType, setSelectedType] = useState<string>('valoracion');
    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        ><IonHeader
            collapse="condense"
            className="custom-toolbar z-50 -top-16"
        >
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <main className="w-full min-h-[75vh] px-4 sm:px-6 lg:px-8 pb-7">
                <div className="max-w-2xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{selectedType === "valoracion" ? 'Valoracion' : "Evaluacion"}</h1>
                        <div className="space-y-1">
                            <p className="text-gray-600 text-lg">Danos tu opinion</p>
                            <p className="text-gray-600 text-sm">Quejas y sugerencias seran bien recibidas y tomadas en cuenta.</p>
                        </div>
                    </header>
                    <div className="max-w-2xl mx-auto mb-8">
                        <IonSegment
                            value={selectedType}
                            onIonChange={(e: any) => setSelectedType(e.detail.value!)}
                        >
                            <IonSegmentButton value="valoracion">
                                <IonLabel>Valoracion</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="evaluacion">
                                <IonLabel>Evaluacion</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>
                    <MainForm
                        actionType={selectedType === "valoracion" ? 'valoracion' : 'evaluacion'}
                        dataForm={selectedType === "valoracion" ? ValoracionesField() : EvaluacionField()}
                        aditionalData={{
                            fecha: new Date()
                        }}
                        message_button="registrar"
                    />
                </div>
            </main>
            <Footer />
        </IonContent>
    );
}