import "./App.css";
// @ts-ignore
{
  /* The following line can be included in your src/index.js or App.js file */
}
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'primeicons/primeicons.css';
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import IPInfo from "ip-info-react";
import Routers from "./screens/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useMediaQuery } from "react-responsive";
import DesktopRouters from "./screens/DesktopRouter";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";

function App() {
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }: any) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };


  return (
    <Provider store={store}>

      <IPInfo>
        <PrimeReactProvider>
          <Desktop>
            <DesktopRouters />
          </Desktop>
          <Tablet>
            <Routers />
          </Tablet>
          <Mobile>
            <Routers />
          </Mobile>
        </PrimeReactProvider>
      </IPInfo>
    </Provider>
  );
}

export default App;
