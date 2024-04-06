
import { useMediaQuery } from "react-responsive"
import frame from "../../assets/images/frame1.svg"
import { useEffect, useState } from "react"
import { OverflowY } from "../../utils/type"



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
        width: "100%",
        height: "100vh",
        overflowY: "scroll" as OverflowY,
        padding: "5rem 0px 0px 0px"
    }
}



function Layout({ children }) {
    const [state, setState] = useState(true)

    const Desktop = ({ children }: any) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const handleImageLoad = () => {
        setState(false)
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setState(false)
    //     }, 2000)
    // }, [])


    return (
        <div style={{ ...styles.container}}>
            <Desktop>
                <div>
                    <img 
                    src={frame} 
                    alt="image"
                    onLoad={handleImageLoad}
                    style={{ height: "100vh" }} 
                    />
                </div>
            </Desktop>

          {
            !state &&   <div style={{ ...styles.secondColumn }}>
            <div style={{width: "50%"}}>
                 {children}
            </div>
           
        </div>
          }
        </div>
    )
}

export default Layout
