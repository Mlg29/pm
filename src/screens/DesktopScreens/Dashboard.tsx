import GameCard from "../../components/GameCard"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import { FlexDirection } from "../../utils/type"
import DashboardLayout from "./Components/DashboardLayout"
import NavHeader from "./Components/NavHeader"
import slider from "../../assets/images/slider.svg"


const styles = {
    container: {
        background: COLORS.semiGray,
        display: "flex",
        flexDirection: "column" as FlexDirection,
        flex: 1,
        height: "100%"
    },
    div: {
        backgroundColor: COLORS.white,
        padding: "10px 20px",
        borderRadius: 10,
        marginTop: "2rem"
    }
}


function Dashboard() {
    return (
        <div style={{ ...styles.container }}>
            <DashboardLayout>
                <div>
                    <div>
                        <img src={slider} style={{ width: "100%" }} />
                    </div>
                    <div style={{ ...styles.div }}>

                        <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>TODAY</p>
                        {
                            ["", "", "", "", ""]?.map((aa: any) => {
                                return <GameCard />
                            })
                        }
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}

export default Dashboard
