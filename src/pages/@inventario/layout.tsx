import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import VerificadorSeguridad from "./page";
import { getLocalStorageItem } from "@/utils/functions/local-storage";

const LayoutInventario: React.FC = () => {

    const userRole = getLocalStorageItem("user-role");
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header isScrolled={isScrolled} showMenuButton />
                <VerificadorSeguridad onScroll={(scrolled) => setIsScrolled(scrolled)} />
            </IonPage>
        </>
    );
};

export default LayoutInventario;