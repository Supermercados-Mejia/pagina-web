import type React from "react";
import { useState } from "react";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import AppMenu from "@/template/menu";
import ModelUser from "./@user/page";
import { getLocalStorageItem } from "@/utils/functions/local-storage";
import ModelAdmin from "./@admin/page";

const LayoutModel: React.FC = () => {

    const userRole = getLocalStorageItem("user-role");
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <>
            <AppMenu />
            <IonPage id="main-content">
                <Header title="Liz" isScrolled={isScrolled} showMenuButton />
                {userRole === 'admin' ?
                    (<ModelAdmin onScroll={(scrolled) => setIsScrolled(scrolled)} />)
                    :
                    (<ModelUser onScroll={(scrolled) => setIsScrolled(scrolled)} />)
                }
            </IonPage>
        </>
    );
};

export default LayoutModel;