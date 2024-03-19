

import './App.css'
// @ts-ignore

import Routers from './screens/Router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useMediaQuery } from 'react-responsive'



function App() {
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }: any) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

  return (
    <Provider store={store}>
      <Desktop>Desktop or laptop</Desktop>
      <Tablet>Tablet</Tablet>
      <Mobile>
        <Routers />
      </Mobile>

    </Provider>
  )
}

export default App
