import { PageProps } from "@/utils/types/page";
import PriceChecker from "../components/price-checker";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";


export default function VerificadorUser({ onScroll }: PageProps) {
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
            <div className="w-full max-w-xl m-auto mt-20">
                <h1 className="text-2xl font-bold mb-6 text-center">Verificador de Precios</h1>
                <PriceChecker />
            </div>
        </IonContent>
    )
}
