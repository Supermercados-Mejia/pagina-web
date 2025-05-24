import MainForm from "@/components/form/main-form";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { VacantesField } from "../utils/vacantes-field";
import Footer from "@/template/footer";


export default function VacantesAdmin({ onScroll }: PageProps) {

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
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Vacantes</h1>
                        <div className="space-y-1">
                            <p className="text-gray-600 text-lg">Ingresa las caracteristicas de la vacante.</p>
                        </div>
                    </header>
                    <MainForm
                        actionType={'vacantes'}
                        dataForm={VacantesField()}
                        aditionalData={{
                            date: new Date()
                        }}
                        formName="PostulacionForm"
                        message_button="registrar"
                    />
                </div>
            </main>
            <Footer />
        </IonContent>
    );
}