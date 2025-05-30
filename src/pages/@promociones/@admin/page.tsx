import MainForm from "@/components/form/main-form";
import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonButton, IonContent, IonHeader, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { promocionesField } from "../utils/promociones-field";

export default function PromocionesAdmin({ onScroll }: PageProps) {
    const [selectedType, setSelectedType] = useState<string>('combos');
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
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Promociones</h1>

                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Registra nuevas promociones y combos</p>
                            <p className="text-gray-600 text-lg">Administra los ya existentes.</p>
                        </label>
                    </header>

                    <section className="m-auto w-fit pb-2">
                        <IonButton color={"tertiary"} >Cargar</IonButton>
                        <IonButton color={"tertiary"} target="_blank" href="https://google.com" fill="clear">Ver</IonButton>
                    </section>

                    <section className="max-w-2xl mx-auto mb-8">
                        <IonSegment
                            value={selectedType}
                            onIonChange={(e: any) => setSelectedType(e.detail.value!)}
                        >
                            <IonSegmentButton value="combos">
                                <IonLabel>Combos</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="promociones">
                                <IonLabel>Promociones</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </section>

                    <section aria-labelledby="promotions-heading" className="mt-6">
                        <h2 id="promotions-heading" className="sr-only">Promociones y Combos</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <MainForm
                                actionType="post-promociones"
                                dataForm={promocionesField()}
                                message_button="Registrar"
                            />
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>
    );
}