import type React from "react";
import { setSucursal } from "@/hooks/slices/app";
import { setLocalStorageItem } from "@/utils/functions/local-storage";
import { useAppDispatch } from "@/hooks/selector";
import { useHistory } from "react-router";
import { IonPage } from "@ionic/react";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <IonPage>

    </IonPage>
  );
};

export default Layout;