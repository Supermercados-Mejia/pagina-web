import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton, IonButton } from "@ionic/react";
import PromoBanner from "../components/banner-offers";
import { promoItems } from "@/pages/@promociones/data/promo";

export default function ModelUser({ onScroll }: PageProps) {

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
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Model</h1>
                        <PromoBanner items={promoItems} autoPlay={true} interval={3000} showControls={true} showIndicators={true} />

                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nam, deserunt culpa ipsa fuga, dolorum odit, reprehenderit iusto alias eaque officia aliquam facilis iure omnis neque. Quis eum iusto facere?</p>
                            <p className="text-gray-600 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis iusto maiores eligendi. Fuga, recusandae delectus numquam nam reiciendis et, quos explicabo nihil corporis, libero tempora voluptates dolores sed blanditiis minima....</p>
                        </label>
                    </header>

                    <section className="m-auto w-fit pb-2">
                        <IonButton color={"tertiary"} target="_blank" href="https://google.com">Descargar</IonButton>
                        <IonButton color={"tertiary"} target="_blank" href="catalogo.jpg" fill="clear">Ver</IonButton>
                    </section>

                    <section className="max-w-2xl mx-auto mb-8">
                        <IonSegment>
                            <IonSegmentButton value="model1">
                                <IonLabel>Model1</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="model2">
                                <IonLabel>Model2</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="model3">
                                <IonLabel>Model3</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </section>

                    <section aria-labelledby="promotions-heading" className="mt-6">
                        <h2 id="promotions-heading" className="sr-only">Model</h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>
    )
}