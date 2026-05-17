import type React from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import ModelID from "./page";

const LayoutModelId: React.FC = () => {

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                 <Header showMenuButton showBackButton defaultBack="/model" />
                <ModelID />
            </IonPage>
        </>
    );
};

export default LayoutModelId;