import MainForm from "@/components/form/main-form";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonSegment, IonSegmentButton, IonBackButton } from "@ionic/react";

import Footer from "@/template/footer";
import { ValoracionesField } from "../utils/valorraciones-field";
import { useState } from "react";
import { EvaluacionField } from "../utils/evaluacion-field";
import { IconLiz } from "@/template/icon-liz";


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
            className="custom-toolbar-clear h-fit absolute -top-0"
        >
                <IonToolbar>
                    <a className="cursor-pointer" href="/">
                        <IconLiz fill={onScroll ? "#FFF" : "#7927F5"} width={55} />
                    </a>
                </IonToolbar>
            </IonHeader>
            <section className="flex my-4">
                <IonBackButton color={"tertiary"} text={"Regresar"} defaultHref="/" />
            </section>
            <main className="w-full min-h-[75vh] px-4 sm:px-6 lg:px-8 py-7">
                <div className="max-w-2xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{selectedType === "valoracion" ? 'Valoracion' : "Evaluacion"}</h1>
                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Danos tu opinion</p>
                            <p className="text-gray-600 text-sm">Quejas y sugerencias seran bien recibidas y tomadas en cuenta.</p>
                        </label>
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