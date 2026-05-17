import type React from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import PromocionesID from "./page";

const LayoutPromocionesId: React.FC = () => {

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header showMenuButton showBackButton defaultBack="/promociones" />
                <PromocionesID />
            </IonPage>
        </>
    );
};

export default LayoutPromocionesId;