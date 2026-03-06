import { PageProps } from "@/utils/types/page";
import { IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import Footer from "@/template/footer";
import PriceChecker from "./components/price-checker";
import { IconLiz } from "@/template/icon-liz";

export default function VerificadorSeguridad({ onScroll }: PageProps) {
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
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Consulta de inventario</h1>
                    <label className="space-y-1">
                        <p className="text-gray-600 text-lg">Escanea tus productos</p>
                    </label>
                </header>
                <div className="max-w-2xl mx-auto mb-8">
                    <PriceChecker />
                </div>
            </main>
            <Footer />
        </IonContent>
    )
}
