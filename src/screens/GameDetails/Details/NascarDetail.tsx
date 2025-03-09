import React from "react";
import { useMediaQuery } from "react-responsive";
import HorseCard from "../../../components/GameDetailCardHeader/HorseCard";
import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";
import Formula1CardHeader from "../../../components/GameDetailCardHeader/Formula1CardHeader";
import NascarCardHeader from "../../../components/GameDetailCardHeader/NascarCardHeader";

const styles = {
    div: {
        marginTop: "3rem",
    },
    card: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        margin: "10px 0px",
        padding: 15,
        borderRadius: 10,
        cursor: 'pointer'
    },
};

function NascarDetail({ selected, gameInfo, dateTime, handleRoute }) {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const bb = {
        gameName: gameInfo?.name,
        race: gameInfo?.race[0]
    }

    // console.log("gam>>", gameInfo)

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: '0px 10px' }}>
            <NascarCardHeader gameInfo={bb} />
            {
                gameInfo?.race[0]?.status === "Finished" ?
                    <div style={styles.div}>
                        {gameInfo?.race[0]?.results?.driver?.map((dd, i) => {

                            return (
                                <div
                                    style={{
                                        ...styles.card,
                                        backgroundColor:
                                            selected === dd?.name ? COLORS.primary : COLORS.cream,
                                        color: selected === dd?.name ? COLORS.cream : COLORS.primary,
                                    }}
                                    onClick={() => handleRoute(dd?.name, `W${i + 1}`)}
                                    key={i}
                                >
                                    <p style={{ ...FONTS.h6 }}>{dd?.name} finished with {dd?.position} position</p>
                                </div>
                            );
                        })}
                    </div>

                    :
                    <div style={styles.div}>
                        {gameInfo?.race?.driver?.map((dd, i) => {
                            return (
                                <div
                                    style={{
                                        ...styles.card,
                                        backgroundColor:
                                            selected === dd?.name ? COLORS.primary : COLORS.cream,
                                        color: selected === dd?.name ? COLORS.cream : COLORS.primary,
                                    }}
                                    key={i}
                                    onClick={() => handleRoute(dd?.name, `W${i + 1}`)}
                                >
                                    <p style={{ ...FONTS.h6 }}>Bet {dd?.name} to win</p>
                                </div>
                            );
                        })}
                    </div>
            }
        </div>
    );
}

export default NascarDetail;
