import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import ScannerComponent from "./page";
const LayoutScanner: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header title="Liz" isScrolled={isScrolled} showMenuButton />
                <ScannerComponent onScroll={(scrolled) => setIsScrolled(scrolled)} />
            </IonPage>
        </>
    );
};

export default LayoutScanner;