import MainForm from "@/components/form/main-form";
import Pagination from "@/components/pagination";
import DynamicTable from "@/components/table";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { PostulacionesField } from "../utils/postulaciones-field";


export default function UserPostulaciones({ onScroll }: PageProps) {

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
            <div className="w-4/5 m-auto -mt-10">
                <MainForm
                    actionType={'v2/insert/postulaciones'}
                    dataForm={PostulacionesField()}
                    aditionalData={{
                        date: new Date()
                    }}
                    message_button="registrar"
                />
            </div>
        </IonContent>
    );
}