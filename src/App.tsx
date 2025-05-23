import React, { useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useAppSelector } from './hooks/selector';

import { getLocalStorageItem } from './utils/functions/local-storage';
import { RootState } from './hooks/store';

import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

import Background from './template/background';

import { navigationAdmin, navigationDefault, navigationUser } from './utils/constants/router';

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

import "driver.js/dist/driver.css";

// Generar conjunto de todas las rutas válidas
const allValidPaths = [...navigationAdmin, ...navigationUser].map((item: any) => item.page && item.href);
const validPathsSet = new Set(allValidPaths);

setupIonicReact({ mode: 'ios' });


const App: React.FC = () => {

  /*
  import { driver } from "driver.js";
  
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#tour-example', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
      { element: 'code .line:nth-child(1)', popover: { title: 'Import the Library', description: 'It works the same in vanilla JavaScript as well as frameworks.', side: "bottom", align: 'start' } },
      { element: 'code .line:nth-child(2)', popover: { title: 'Importing CSS', description: 'Import the CSS which gives you the default styling for popover and overlay.', side: "bottom", align: 'start' } },
      { element: 'code .line:nth-child(4) span:nth-child(7)', popover: { title: 'Create Driver', description: 'Simply call the driver function to create a driver.js instance', side: "left", align: 'start' } },
      { element: 'code .line:nth-child(18)', popover: { title: 'Start Tour', description: 'Call the drive method to start the tour and your tour will be started.', side: "top", align: 'start' } },
      { element: 'a[href="/docs/configuration"]', popover: { title: 'More Configuration', description: 'Look at this page for all the configuration options you can pass.', side: "right", align: 'start' } },
      { popover: { title: 'Happy Coding', description: 'And that is all, go ahead and start adding tours to your applications.' } }
    ]
  }); 

  driverObj.drive();
  */

  const history = useHistory();
  const location = useLocation();

  const userRole = getLocalStorageItem("user-role");
  const userToken = getLocalStorageItem("token");
  const reduxToken = useAppSelector((state: RootState) => state.auth?.mutations?.[0]?.data?.token);

  const currentBranch = reduxToken ?? userToken;

  const checkRedirect = useCallback(() => {
    const currentPath = location.pathname;

    if (currentBranch && currentPath === '/') {
      // Usuario autenticado: redirigir desde raíz a dashboard');
      history.replace('/layout');
    }
  }, [currentBranch, location.pathname, history]);

  useEffect(() => {
    checkRedirect();
  }, [checkRedirect]);

  const getNavigation = () => {
    if (!currentBranch) return navigationDefault;
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
                  component={Page}
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