import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonFabButton, IonHeader, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { ModalAddPromotion } from "../components/modal-add-promotion";
import { Plus } from "lucide-react";

export default function ModelAdmin({ onScroll }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);

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
            <IonFabButton color={"tertiary"} onClick={() => setIsOpen(true)} size="small" className="size-12 fixed right-4 bottom-14 z-50 ">
                <Plus />
            </IonFabButton>
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Model</h1>

                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi possimus eligendi vel obcaecati, sit harum asperiores dolore iste. Porro sed cumque quia repudiandae temporibus debitis vel iure adipisci est sequi?</p>
                            <p className="text-gray-600 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo id possimus neque molestias modi facilis at, dolores doloribus, perferendis quos, est repudiandae quod veniam magnam numquam minus veritatis optio necessitatibus?.</p>
                        </label>
                    </header>

                    <section className="max-w-2xl mx-auto mb-8">
                        <IonSegment>
                            <IonSegmentButton value="model1">
                                <IonLabel>Model1</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="model2">
                                <IonLabel>Model2</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </section>

                    <section aria-labelledby="promotions-heading" className="mt-6">
                        <h2 id="promotions-heading" className="sr-only">Model</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        </ul>
                    </section>
                    <ModalAddPromotion isOpen={isOpen} setIsOpen={setIsOpen}/* form={form} */ />
                </div>
            </main>

            <Footer />
        </IonContent>
    );
}