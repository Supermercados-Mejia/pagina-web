import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import Footer from "@/template/footer";
import PriceChecker from "./components/price-checker";

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
