import type React from "react";
import { setSucursal } from "@/hooks/slices/app";
import { setLocalStorageItem } from "@/utils/functions/local-storage";
import { useAppDispatch } from "@/hooks/selector";
import { useHistory } from "react-router";
import { IonPage } from "@ionic/react";
import Header from "@/template/header";
import Page from "./page";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <IonPage>
      <Header title="Liz" /* className="bg-white/90" */ />
      <Page />
    </IonPage>
  );
};

export default Layout;