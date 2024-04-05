

import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import GameDetailCardHeader from "../../components/GameDetailCardHeader"
import Header from "../../components/Header"
import { COLORS } from "../../utils/colors"
import { useState } from "react"
import { FONTS } from "../../utils/fonts"
import { FlexDirection } from "../../utils/type"
import CardList from "../../components/CardList"
import AllTime from "../../components/CardList/AllTime"
import roma from "../../assets/images/roma.svg"
import milan from "../../assets/images/millan.svg"

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        padding: "0px 20px",
        flex: 1,
        height: "100%",
        backgroundColor: COLORS.white,
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
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    row2: {
        display: "flex",
        width: "100%",
        marginTop: "10px",
        alignItems: "center"
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

                <div style={{ ...styles.tabs }}>
                    <div style={{ ...styles.tb, backgroundColor: active === "stat" ? COLORS.white : "transparent" }} onClick={() => setActive("stat")}>
                        <p style={{ ...FONTS.body6 }}>STATS</p>
                    </div>
                    <div style={{ ...styles.tb, backgroundColor: active === "lineup" ? COLORS.white : "transparent" }} onClick={() => setActive("lineup")}>
                        <p style={{ ...FONTS.body6 }}>LINEUPS</p>
                    </div>
                    <div style={{ ...styles.tb, backgroundColor: active === "h2h" ? COLORS.white : "transparent" }} onClick={() => setActive("h2h")}>
                        <p style={{ ...FONTS.body6 }}>H2H</p>
                    </div>
                </div>



                {
                    active === "stat" && <div>
                        <CardList
                            header="Ball Possession"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Goal Attempts"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Short on Goal"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Pass Accuracy"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Foul"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Yellow"
                            homeText="50"
                            awayText="50"
                        />
                        <CardList
                            header="Red"
                            homeText="50"
                            awayText="50"
                        />
                    </div>
                }

                {
                    active === "h2h" && <div>
                        <div>
                            <h3 style={{ ...FONTS.h6, textAlign: 'center', marginTop: "1rem" }}>Last 5 Games</h3>
                            <div style={{...styles.row}}>
                                <div>
                                    <h3 style={{...FONTS.h5, color: COLORS.green}}>1</h3>
                                    <p style={{...FONTS.body6, color: COLORS.green}}>Millan</p>
                                </div>
                                <div>
                                    <h3 style={{...FONTS.h5, color: COLORS.gray, textAlign: 'center'}}>1</h3>
                                    <p style={{...FONTS.body6, color: COLORS.gray, textAlign: 'center'}}>Draw</p>
                                </div>
                                <div>
                                    <h3 style={{...FONTS.h5, color: COLORS.red, textAlign: 'right'}}>3</h3>
                                    <p style={{...FONTS.body6, color: COLORS.red}}>AS Roma</p>
                                </div>
                            </div>
                            <div style={{...styles.row2}}>
                                <div style={{width: "20%",height: 5, backgroundColor: COLORS.green}}></div>
                                <div style={{width: "20%",height: 5, backgroundColor: COLORS.gray}}></div>
                                <div style={{width: "60%",height: 5, backgroundColor: COLORS.red}}></div>
                            </div>
                        </div>
                        <h3 style={{ ...FONTS.h6, textAlign: 'center', marginTop: "1rem" }}>All last 5 games</h3>
                        <AllTime
                            homeTeam="Milan"
                            awayTeam="As Roma"
                            homeImage={milan}
                            awayImage={roma}
                            homeLastFive={["W", "W", "D", "W", "W"]}
                            awayLastFive={["L", "W", "D", "W", "L"]}
                        />
                    </div>
                }


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
                        propStyle={{ width: "100%", backgroundColor: COLORS.white, border: `1px solid ${COLORS.primary}`, color: COLORS.primary }}
                        handlePress={() => navigate('/home')}
                    />
                </div>
            </div>


        </div>
    )
}

export default GameDetails
