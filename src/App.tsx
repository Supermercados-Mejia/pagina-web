import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useAppSelector } from './hooks/selector';

import { getLocalStorageItem } from './utils/functions/local-storage';
import { RootState } from './hooks/store';

// Importa tus componentes
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
// Estilos
import './theme/variables.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';
import Background from './template/background';
import { navigationAdmin, navigationUser } from './utils/constants/router';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => {
  // Usar useNavigate en lugar de useHistory para react-router v6 (si es posible)
  const history = useHistory();
  const location = useLocation();

  // Obtener valores de forma correcta y tipada
  const userRole = getLocalStorageItem("user-role");
  const userToken = getLocalStorageItem("token");
  const reduxToken = useAppSelector((state: RootState) => state.auth?.mutations?.[0]?.data?.token);
  const currentBranch = userToken ?? reduxToken;

  // Usar useCallback para memoizar la lógica de redirección
  const checkRedirect = useCallback(() => {
    const isLayoutPage = location.pathname === '/';

    if (!currentBranch && !isLayoutPage) {
      history.replace('/');
      return;
    }

    if (currentBranch && isLayoutPage) {
      history.replace('/layout');
    }
  }, [currentBranch, location.pathname, history]);

  const getNavigation = () => {
    if (!currentBranch) return [];
    return userRole === "admin" ? navigationAdmin : navigationUser;
  };
  // Efecto más limpio y eficiente
  useEffect(() => {
    checkRedirect();
  }, [checkRedirect]);

  return (
    <IonApp>
      <IonRouterOutlet>
        <Background>
          <Switch>
            <Route exact path="/layout">
              <Layout />
            </Route>
            {getNavigation().map((key: any, item: any) => {
              const Page = item.page;
              return (<>
                {currentBranch ? <Route key={key} exact path={item.href} component={Page} />
                  : <Redirect key={key} to="/layout" />}
              </>
              );
            })}

            <Route exact path="/">
              <Redirect to="/layout" />
            </Route>

            {/* Manejo de rutas no encontradas */}
            <Route>
              <NotFound />
            </Route>

          </Switch >
        </Background>
      </IonRouterOutlet>
    </IonApp>
  );
};

export default React.memo(App);