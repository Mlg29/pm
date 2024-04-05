
import colorSend1 from "../../assets/images/color-send1.svg"
import colorSend2 from "../../assets/images/color-send2.svg"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const styles = {
    container: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem 0px",
        paddingBottom: "20px",
        borderBottom: `1px solid ${COLORS.semiGray}`
    },
    box: {
        backgroundColor: COLORS.lightGreen,
        padding: 10,
        borderRadius: "100%",
        border: `1px solid ${COLORS.green}`,
        display: "flex",
        justifyContent: "center",
        margin: "0px 10px 0px 0px"
    },
    boxSend: {
        backgroundColor: COLORS.lightRed,
        padding: 10,
        borderRadius: "100%",
        border: `1px solid ${COLORS.red}`,
        display: "flex",
        justifyContent: "center",
        margin: "0px 10px 0px 0px"
    },
    box2: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }
}


function TransactionCard(props: any) {
    const { text, amount, date, incoming } = props
    return (
        <div style={{ ...styles.container }}>
            {
                incoming ?
                    <div style={{ ...styles.box }}>
                        <img src={colorSend1} />
                    </div>
                    : <div style={{ ...styles.boxSend }}>
                        <img src={colorSend2} />
                    </div>
            }
            <h3 style={{ ...FONTS.h6, width: "50%", color: incoming ? COLORS.green : COLORS.red }}>{text}</h3>
            <div style={{ ...styles.box2 }}>
                <h3 style={{ ...FONTS.h6, color: incoming ? COLORS.green : COLORS.red  }}>{amount}</h3>
                <p style={{ ...FONTS.body7, color: COLORS.gray,textAlign: "right", margin: "5px 0px 0px 0px", fontSize: "10px" }}>{date}</p>
            </div>
        </div>
    )
}

export default TransactionCard
