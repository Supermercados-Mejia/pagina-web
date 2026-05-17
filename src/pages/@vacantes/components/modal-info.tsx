import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";

export default function ModalInfo(
    { modal, showModal, setShowModal, children }:
        { modal: any, showModal: boolean, setShowModal: (show: boolean) => void, children?: React.ReactNode }) {

    return (
        <IonModal
            ref={modal}
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            trigger="open-modal"
            expandToScroll={true}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="font-sans">Datos de candidato</IonTitle>
                    <IonButtons slot="start">
                        <IonButton fill="clear" onClick={() => setShowModal(false)} color={"tertiary"}>
                            Cerrar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {children}
            </IonContent>
        </IonModal>
    );
}