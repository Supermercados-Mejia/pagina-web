import { useState } from "react";
import type React from "react";
import { setSucursal } from "@/hooks/slices/app";
import { setLocalStorageItem } from "@/utils/functions/local-storage";
import { useAppDispatch } from "@/hooks/selector";
import { useHistory } from "react-router";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import Page from "./page";
import AppMenu from "@/template/menu";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <>
      <AppMenu />
      <IonPage id="main-content">
        <Header title="Liz" isScrolled={isScrolled} />
        <Page onScroll={(scrolled) => setIsScrolled(scrolled)} />
      </IonPage>
    </>
  );
};

export default Layout;