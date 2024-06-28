
import { useMediaQuery } from "react-responsive"
import frame from "../../assets/images/frame1.svg"
import { useEffect, useState } from "react"
import { OverflowY } from "../../utils/type"
import Loader from "../Loader"



const styles = {
    container: {
        display: "flex",
        alignItems: 'center',
        height: "100vh"
    },
    secondColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        // width: "100%",
        width: "50%",
        height: "100vh",
        overflowY: "scroll" as OverflowY,
        padding: "2rem 0px 0rem 0px"
    },
    backgroundSvg: {
        width: "50%",
        height: "100vh",
        backgroundImage: `url(${frame})`,
        backgroundSize: 'cover', /* Adjust as needed */
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }
}



function Layout({ children }) {
    const [state, setState] = useState(true)
    const [loader, setLoader] = useState(false)

    const Desktop = ({ children }: any) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const handleImageLoad = () => {
        setState(false)
    }

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 2000)
    }, [])

    if (loader) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: "100vh",
            }}
          >
            <Loader />
          </div>
        );
      }


    return (
        <div style={{ ...styles.container}}>
            <Desktop>
                <div style={{...styles.backgroundSvg}}>
                    {/* <img 
                    src={frame} 
                    alt="image"
                    onLoad={handleImageLoad}
                    style={{ height: "100vh", width: '100%' }} 
                    /> */}
                </div>
            </Desktop>

        
         <div style={{ ...styles.secondColumn }}>
            <div style={{width: "90%", height: "98vh", paddingBottom: 20}}>
                 {children}
            </div>
           
        </div>
        
        </div>
    )
}

export default Layout
