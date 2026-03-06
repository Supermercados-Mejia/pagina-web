import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import FileUser from "./page";

const LayoutFile: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header isScrolled={isScrolled} showMenuButton />
                <FileUser onScroll={(scrolled) => setIsScrolled(scrolled)} />
            </IonPage>
        </>
    );
};

export default LayoutFile;