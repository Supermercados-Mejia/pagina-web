import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import { getLocalStorageItem } from "@/utils/functions/local-storage";
import AdminPostulaciones from "./@admin/page";

const LayoutPostulaciones: React.FC = () => {

    const userRole = getLocalStorageItem("user-role");
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header title="Liz" isScrolled={isScrolled} showMenuButton />
                {userRole === 'admin' ?
                    (<AdminPostulaciones />)
                    :
                    (<></>)
                }
            </IonPage>
        </>
    );
};

export default LayoutPostulaciones;