
import { useNavigate } from "react-router-dom"
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"


type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';


export const styles = {
    container: {
        border: `1px solid ${COLORS.semiGray}`,
        borderRadius: 10,
        padding: 10,
        margin: "0px 0px 20px 0px"
    },
    row: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        alignItems: "center",
        justifyContent: "space-between",

    },
    row2: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0px 5px 0px"
    },
    box: {
        backgroundColor: COLORS.cream,
        width: "30%",
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontSize: 12
    }
}




function GameCard() {
    const navigate = useNavigate()

  return (
    <div style={{...styles.container}} onClick={() => navigate("/game-details")}>
        <div style={{...styles.row}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
                <p style={{...FONTS.body7, margin: "0px 0px 10px 0px"}}>England - PL</p>
                <img src={milan} />
                <p style={{...FONTS.body7, margin: "10px 0px 0px 0px"}}>Barcelona</p>
            </div>
            <div>
                <p style={{...FONTS.body7, backgroundColor: COLORS.red, textAlign: 'center', borderRadius: 10, color: COLORS.white}}>LIVE</p>
                <h3 style={{...FONTS.h5, margin: "10px 0px 0px 0px"}}>4 - 1</h3>
                <p style={{...FONTS.body7, textAlign: 'center'}}>81’</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
                <p style={{...FONTS.body7, margin: "0px 0px 10px 0px"}}>ID: 33013</p>
                <img src={roma} />
                <p style={{...FONTS.body7, margin: "10px 0px 0px 0px"}}>Juventus</p>
            </div>

        </div>

        <div style={{...styles.row2}}>
            <div style={{...styles.box}}>Home Win</div>
            <div style={{...styles.box}}>Draw</div>
            <div style={{...styles.box}}>Away Win</div>
        </div>


    </div>
  )
}

export default GameCard
