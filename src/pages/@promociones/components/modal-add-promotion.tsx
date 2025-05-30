import MainForm from "@/components/form/main-form";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";

export function ModalAddPromotion({ isOpen, setIsOpen, form }: any) {
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={() => setIsOpen(false)}
            trigger="open-modal"
            expandToScroll={true}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="font-sans">Modal</IonTitle>
                    <IonButtons slot="start">
                        <IonButton fill="clear" onClick={() => setIsOpen(false)} color={"tertiary"}>
                            Cerrar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <MainForm
                    actionType="post-promociones"
                    dataForm={form}
                    message_button="Registrar"
                />
            </IonContent>
        </IonModal>
    )
}