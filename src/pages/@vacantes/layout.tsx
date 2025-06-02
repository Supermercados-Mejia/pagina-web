import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import VacantesUser from "./@user/page";
import { getLocalStorageItem } from "@/utils/functions/local-storage";
import VacantesAdmin from "./@admin/page";

const LayoutVacantes: React.FC = () => {

    const userRole = getLocalStorageItem("user-role");
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header title="Liz" isScrolled={isScrolled} showMenuButton />
                {userRole === 'admin' ?
                    (<VacantesAdmin onScroll={(scrolled) => setIsScrolled(scrolled)} />)
                    :
                    (<VacantesUser onScroll={(scrolled) => setIsScrolled(scrolled)} />)
                }
            </IonPage>
        </>
    );
};

export default LayoutVacantes;