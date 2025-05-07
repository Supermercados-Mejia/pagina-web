import type React from "react";
import { setSucursal } from "@/hooks/slices/app";
import { setLocalStorageItem } from "@/utils/functions/local-storage";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <IonPage>

    </IonPage>
  );
};

export default Layout;