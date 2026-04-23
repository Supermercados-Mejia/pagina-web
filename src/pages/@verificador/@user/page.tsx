import { PageProps } from "@/utils/types/page";
import PriceChecker from "../components/price-checker";
import { IonBackButton, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import Footer from "@/template/footer";
import { IconLiz } from "@/template/icon-liz";
import { useState } from "react";
import { ScanBarcode } from "lucide-react";
import BannerChecker from "../components/banner-ofer";

export default function VerificadorUser({ onScroll }: PageProps) {

    const [currentTime, setCurrentTime] = useState(new Date())
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

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
                <div ><BannerChecker /></div>
                <div className="max-w-2xl mx-auto mb-8">
                    <PriceChecker />
                </div>
                <header className="text-center mb-8">
                    <div className="text-center py-10">
                        <div className="w-30 h30 mx-auto mb-6 rounded-full flex items-center justify-center ">
                            <ScanBarcode className="w-10 h-10 text-gray-400 " />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-400 text-foreground mb-2">
                            ¡Bienvenido!
                        </h3>
                        <p className="text-muted-foreground text-gray-400 max-w-md mx-auto">
                            Escanea el código de barras de cualquier producto para consultar su precio.
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>
                            {currentTime.toLocaleDateString("es-MX", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })}
                        </span>
                        <span>
                            {currentTime.toLocaleTimeString("es-MX", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </header>
            </main>
            <p className="text-gray-400 text-sm text-center">
                Los precios mostrados están sujetos a disponibilidad y pueden cambiar sin previo aviso.
            </p>
            <Footer />
        </IonContent>
    )
}
