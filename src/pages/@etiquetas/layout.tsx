import Etiquetas from "./page"
import AppMenu from "@/template/menu";
import Header from "@/template/header";

import { useState } from "react";
import { IonPage } from "@ionic/react";

export default function EtiquetasLayout() {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header isScrolled={isScrolled} showMenuButton />
                <Etiquetas onScroll={(scrolled) => setIsScrolled(scrolled)} />
            </IonPage>
        </>
    )
}

