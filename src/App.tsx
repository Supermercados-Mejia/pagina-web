import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useAppSelector } from './hooks/selector';

import { getLocalStorageItem } from './utils/functions/local-storage';
import { RootState } from './hooks/store';

import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

import Background from './template/background';

import { navigationAdmin, navigationUser } from './utils/constants/router';

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

// Generar conjunto de todas las rutas válidas
const allValidPaths = [...navigationAdmin, ...navigationUser].map((item: any) => item.page && item.href);
const validPathsSet = new Set(allValidPaths);

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const userRole = getLocalStorageItem("user-role");
  const userToken = getLocalStorageItem("token");
  const reduxToken = useAppSelector((state: RootState) => state.auth?.mutations?.[0]?.data?.token);

  const currentBranch = userToken ?? reduxToken;

  const checkRedirect = useCallback(() => {
    const currentPath = location.pathname;

    if (!currentBranch) {
      // Usuario no autenticado: redirigir solo si está en ruta válida o raíz
      if (validPathsSet.has(currentPath) || currentPath === '/') {
        history.replace('/');
      }
    } else {
      // Usuario autenticado: redirigir desde raíz a layout
      if (currentPath === '/') {
        history.replace('/layout');
      }
    }
  }, [currentBranch, location.pathname, history]);

  useEffect(() => {
    checkRedirect();
  }, [checkRedirect]);

  const getNavigation = () => {
    if (!currentBranch) return [];
    return userRole === "admin" ? navigationAdmin : navigationUser;
  };

  return (
    <IonApp>
      <IonRouterOutlet>
        <Background>
          <Switch>
            <Route exact path="/">
              <Layout />
            </Route>

            {getNavigation().map((item: any) => {
              const Page = item.page;
              return (
                <Route
                  key={item.href}
                  exact
                  path={item.href}
                  component={currentBranch ? Page : () => <Redirect to="/" />}
                />
              );
            })}

            <Route exact path="/">
              <Redirect to="/" />
            </Route>

            {/* Ruta 404 debe ser la última */}
            <Route component={NotFound} />
          </Switch>
        </Background>
      </IonRouterOutlet>
    </IonApp>
  );
};

export default React.memo(App);