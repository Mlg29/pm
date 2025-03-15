import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"


const styles = {
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

function CardList(props: any) {
    const { header, homeText, awayText } = props

    const total = Number(homeText) + Number(awayText);
    const homeWidth = total > 0 ? (Number(homeText) / total) * 100 : 50;
    const awayWidth = total > 0 ? (Number(awayText) / total) * 100 : 50;

    return (
        <div style={{ margin: "20px 10px" }}>
            <h3 style={{ ...FONTS.h6, textAlign: "center" }}>{header}</h3>
            <div style={{ ...styles.row }}>
                <div style={{ display: "flex", alignItems: "center", width: "48%" }}>
                    <h3 style={{ ...FONTS.body7, margin: "0px 10px 0px 0px" }}>{homeText}</h3>
                    <div style={{ display: "flex", width: "100%", height: 5 }}>
                        <div style={{ height: 5, width: "100%", backgroundColor: COLORS.semiGray }}></div>
                        <div style={{ height: 5, width: `${homeWidth}%`, backgroundColor: COLORS.primary }}></div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", width: "48%" }}>
                    <div style={{ display: "flex", width: "100%", height: 5 }}>
                        <div style={{ height: 5, width: `${awayWidth}%`, backgroundColor: COLORS.primary }}></div>
                        <div style={{ height: 5, width: "100%", backgroundColor: COLORS.semiGray }}></div>

                    </div>
                    <h3 style={{ ...FONTS.body7, margin: "0px 0px 0px 10px" }}>{awayText}</h3>
                </div>
            </div>
        </div>
    )
}

export default CardList
