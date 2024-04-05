
import { useMediaQuery } from "react-responsive"
import frame from "../../assets/images/frame1.svg"



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
    const Desktop = ({ children }: any) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }
    return (
        <div style={{ ...styles.conatiner }}>
            <Desktop>
                <div>
                    <img src={frame} style={{ height: "100vh" }} />
                </div>
            </Desktop>

            <div style={{ ...styles.secondColumn }}>
                <div style={{width: "50%"}}>
                     {children}
                </div>
               
            </div>
        </div>
    )
}

export default Layout
