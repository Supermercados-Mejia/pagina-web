import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useParams } from "react-router";

export default function PageId({ onScroll }: PageProps) {
    const { id } = useParams<{ id: string }>();
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

            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">
                <div className="max-w-2xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Revisión de Candidatos</h1>
                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">2 de 4 candidatos revisados.</p>
                        </label>
                    </header>


                </div>
            </main>
        </IonContent>
    )
}