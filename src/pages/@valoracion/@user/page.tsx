import MainForm from "@/components/form/main-form";
import Pagination from "@/components/pagination";
import DynamicTable from "@/components/table";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

import Footer from "@/template/footer";
import { ValoracionesField } from "../utils/valorraciones-field";


export default function UserValoraciones({ onScroll }: PageProps) {

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
            <div className="w-4/5 m-auto -mt-10 h-[77vh] ">
                <MainForm
                    actionType={'v2/insert/Evaluacion'}
                    dataForm={ValoracionesField()}
                    aditionalData={{
                        date: new Date()
                    }}
                    message_button="registrar"
                />
            </div>
            <Footer />
        </IonContent>
    );
}