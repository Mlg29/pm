
import { useMediaQuery } from "react-responsive"
import frame from "../../assets/images/frame1.svg"
import { useEffect, useState } from "react"



const styles = {
    conatiner: {
        display: "flex",
        alignItems: 'center'
    },
    secondColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%"
    }
}



function Layout({ children }) {
    const [state, setState] = useState(true)

    const Desktop = ({ children }: any) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }



    useEffect(() => {
        setTimeout(() => {
            setState(false)
        }, 2000)
    }, [])


    return (
        <div style={{ ...styles.conatiner }}>
            <Desktop>
                <div>
                    <img src={frame} style={{ height: "100vh" }} />
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
