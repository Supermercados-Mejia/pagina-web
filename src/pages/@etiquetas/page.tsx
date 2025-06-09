import { PageProps } from "@/utils/types/page"
import LabelGenerator from "./components/LabelGenerator"
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

export default function Etiquetas({ onScroll }: PageProps) {
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
                        className="text-white text-5xl p-2 font-medium h-full">
                        Liz
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <main className="w-full min-h-[75vh] px-4 sm:px-6 lg:px-8 pb-7">
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Etiquetas</h1>
                    <label className="space-y-1">
                        <p className="text-gray-600 text-lg">Escanea tus productos genera nuevas etiquetas.</p>
                    </label>
                </header>
                <div className="mx-auto mb-8">
                    <LabelGenerator />
                </div>
            </main>
        </IonContent>
    )
}

