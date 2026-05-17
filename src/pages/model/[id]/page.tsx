import { PageProps } from "@/utils/types/page";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";

export default function ModelID({ onScroll }: PageProps) {
    const { id } = useParams<{ id: string }>();


    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 py-7">

                <div className="max-w-6xl mx-auto">

                </div>
            </main>
        </IonContent>
    )
}