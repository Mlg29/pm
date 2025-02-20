import React from "react";
import { useMediaQuery } from "react-responsive";
import HorseCard from "../../../components/GameDetailCardHeader/HorseCard";
import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";
import Formula1CardHeader from "../../../components/GameDetailCardHeader/Formula1CardHeader";

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

function Formula1Detail({ selected, gameInfo, handleRoute }) {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    console.log({ gameInfo })

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: '0px 10px' }}>
            <Formula1CardHeader gameInfo={gameInfo} />
            {
                gameInfo?.race?.status === "finished" ?
                    <div style={styles.div}>
                        {gameInfo?.race.results?.map((dd, i) => {
                            return (
                                <div
                                    style={{
                                        ...styles.card,
                                        backgroundColor:
                                            selected === dd?.name ? COLORS.primary : COLORS.cream,
                                        color: selected === dd?.name ? COLORS.cream : COLORS.primary,
                                    }}
                                    key={i}
                                >
                                    <p style={{ ...FONTS.h6 }}>{dd?.name} finished with {dd?.position} position</p>
                                </div>
                            );
                        })}
                    </div>

                    :
                    <div style={styles.div}>
                        {gameInfo?.race.runners?.map((dd, i) => {
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

export default Formula1Detail;
