import "./App.css";
// @ts-ignore
{
  /* The following line can be included in your src/index.js or App.js file */
}
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css



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

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  return (
    <Provider store={store}>
      {/* <div id="google_translate_element"></div> */}
      <PrimeReactProvider>
        <Desktop>
          <DesktopRouters />
        </Desktop>
        <Tablet>
          <DesktopRouters />
        </Tablet>
        <Mobile>
          <Routers />
        </Mobile>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
