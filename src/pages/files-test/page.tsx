import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton, IonButton } from "@ionic/react";
import ViewFile from "./components/view-file";

export default function FileUser({ onScroll }: PageProps) {

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

                <div className="max-w-4xl mx-auto">
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Archivos</h1>

                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Gestion de archivo muerto</p>
                        </label>
                    </header>

                    <section className="m-auto w-fit pb-2">
                        <IonButton color={"tertiary"} target="_blank" href="https://google.com">Descargar</IonButton>
                        <IonButton color={"tertiary"} target="_blank" href="catalogo.jpg" fill="clear">Ver</IonButton>
                    </section>

                    <section className="max-w-2xl mx-auto mb-8">
                        <IonSegment value={"todo"}>
                            <IonSegmentButton value="todo">
                                <IonLabel>Todo</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="formatos">
                                <IonLabel>Formatos</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="recibidos">
                                <IonLabel>Recibidos</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </section>

                    <section aria-labelledby="promotions-heading" className="mt-6">
                        <h2 id="promotions-heading" className="sr-only">Model</h2>

                        <ViewFile />
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>
    )
}