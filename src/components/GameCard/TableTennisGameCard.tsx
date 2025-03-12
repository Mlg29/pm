import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import noLogo from "../../assets/images/no.jpg";
import { useNavigate } from "react-router-dom";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        cursor: "pointer",
        paddingBottom: 10,
        borderBottom: `1px solid ${COLORS.semiGray}`,
    },
    box1: {
        marginRight: 20,
        width: "20%",
    },
    box2: {
        marginRight: 10,
        width: "80%",
    },
    box3: {
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: "center",
        marginRight: 10,
        width: "15%",
    },
    box4: {
        marginRight: 10,
        width: "20%",
    },
};

function TableTennisGameCard({ id, data }) {
    const navigate = useNavigate();

    const utcDate = new Date(data?.datetimeUtc);
    const localTime = utcDate.toLocaleTimeString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        <div>


            <div
                style={styles.container}
                key={id}
                onClick={() =>
                    navigate("/game-details", { state: { data: data, gameType: "Table Tennis" } })
                }
            >
                <div style={styles.box1}>
                    <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
                        ({data?.date} - {localTime})
                    </p>
                    <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
                        {data?.status}
                    </p>
                </div>
                <div style={styles.box2}>
                    <p style={{ ...FONTS.body7 }}>{data?.player && data?.player[0]?.name}</p>
                    <p style={{ ...FONTS.body7 }}>{data?.player && data?.player[1]?.name}</p>
                </div>
                <div style={styles.box3}>
                    <div style={{ marginLeft: 10 }}>
                        {data?.player?.map((dd, i) => {
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>

                                    <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
                                        {dd?.totalscore || dd?.totalScore}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
        </div>


    );
}

export default TableTennisGameCard;
