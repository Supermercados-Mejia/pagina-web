import MainForm from "@/components/form/main-form";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton } from "@ionic/react";
import { PostulacionesField } from "../utils/postulaciones-field";
import Footer from "@/template/footer";
import { IconLiz } from "@/template/icon-liz";


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
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 py-7">
                <div className="max-w-2xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Postulacion</h1>
                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">Se parte de la familia</p>
                            <p className="text-gray-600 text-lg">Crece con nosotros.</p>
                        </label>
                    </header>
                    <MainForm
                        actionType={'postulaciones'}
                        dataForm={PostulacionesField()}
                        aditionalData={{
                            fecha_registro: new Date()
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