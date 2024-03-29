

import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import GameDetailCardHeader from "../../components/GameDetailCardHeader"
import Header from "../../components/Header"
import { COLORS } from "../../utils/colors"
import { useState } from "react"
import { FONTS } from "../../utils/fonts"
import { FlexDirection } from "../../utils/type"


const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        padding: "0px 20px",
        flex: 1,
        height: "100%"
    },
    line: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 20px 0px 20px"
    },
    active: {
        backgroundColor: COLORS.primary,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    inactive: {
        backgroundColor: COLORS.semiGray,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    bottom: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        margin: "0px 0px 10px 0px"
    },
    tabs: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.semiGray,
        borderRadius: "5px"
    },
    tb: {
        width: "31%",
        display: "flex",
        justifyContent: "center",
        padding: 10,
        margin: "5px",
        borderRadius: "5px"
    }
}

function GameDetails() {
    const [active, setActive] = useState("stat")
    const navigate = useNavigate()


    return (
        <div style={{ ...styles.container }}>
            <Header
                text="Game Details"
            />
            <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
                <GameDetailCardHeader />

                <div style={{...styles.tabs}}>
                    <div style={{...styles.tb, backgroundColor: active === "stat" ? COLORS.white : "transparent"}} onClick={() => setActive("stat")}>
                        <p style={{...FONTS.body6}}>STATS</p>
                    </div>
                    <div style={{...styles.tb,  backgroundColor: active === "lineup" ? COLORS.white : "transparent"}} onClick={() => setActive("lineup")}>
                        <p style={{...FONTS.body6}}>LINEUPS</p>
                    </div>
                    <div style={{...styles.tb,  backgroundColor: active === "h2h" ? COLORS.white : "transparent"}} onClick={() => setActive("h2h")}>
                        <p style={{...FONTS.body6}}>H2H</p>
                    </div>
                </div>


            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                <div style={{ width: "100%" }}>
                    <Button
                        text="Home Win"
                        propStyle={{ width: "100%" }}
                        handlePress={() => navigate('/home')}
                    />
                </div>
                <div style={{ width: "100%", margin: "10px 0px" }}>
                    <Button
                        text="Away Win"
                        propStyle={{ width: "100%", backgroundColor: COLORS.cream, color: COLORS.primary }}
                        handlePress={() => navigate('/home')}
                    />
                </div>
                <div style={{ width: "100%", margin: "0px 0px 10px 0px" }}>
                    <Button
                        text="Draw"
                        propStyle={{ width: "100%", backgroundColor: COLORS.white, border: `1px solid ${COLORS.primary}`, color: COLORS.primary  }}
                        handlePress={() => navigate('/home')}
                    />
                </div>
            </div>


        </div>
    )
}

export default GameDetails
