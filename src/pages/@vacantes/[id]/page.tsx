import { IconLiz } from "@/template/icon-liz";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton } from "@ionic/react";
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
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 py-7">
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