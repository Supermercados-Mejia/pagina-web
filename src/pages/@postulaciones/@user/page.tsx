import MainForm from "@/components/form/main-form";
import Pagination from "@/components/pagination";
import DynamicTable from "@/components/table";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { PostulacionesField } from "../utils/postulaciones-field";
import Footer from "@/template/footer";


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
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">
                <div className="max-w-2xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Postulacion</h1>
                        <div className="space-y-1">
                            <p className="text-gray-600 text-lg">Se parte de la familia</p>
                            <p className="text-gray-600 text-lg">Crece con nosotros.</p>
                        </div>
                    </header>
                    <MainForm
                        actionType={'postulaciones'}
                        dataForm={PostulacionesField()}
                        aditionalData={{
                            date: new Date()
                        }}
                        message_button="registrar"
                    />
                </div>
            </main>
            <Footer />
        </IonContent>
    );
}