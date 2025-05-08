import type React from "react";
import { setSucursal } from "@/hooks/slices/app";
import { setLocalStorageItem } from "@/utils/functions/local-storage";
import { useAppDispatch } from "@/hooks/selector";
import { useHistory } from "react-router";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Header from "@/template/header";
import Page from "./page";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <IonPage>
      <Header
        title="Home"
        className="md:custom-tertiary md:shadow-none" />
      <Page
        /* title={
          <IonHeader
            collapse="condense"
            className="bg-violet-800 z-30">
            <IonToolbar>
              <IonTitle size="large">Home</IonTitle>
            </IonToolbar>
          </IonHeader>
        } */ />
    </IonPage>
  );
};

export default Layout;