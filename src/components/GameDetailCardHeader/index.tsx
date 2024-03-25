
import { useNavigate } from "react-router-dom"
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import { styles } from "./style"

function GameDetailCardHeader(props: any) {
    const navigate = useNavigate()
    const {propStyle} = props

  return (
    <div style={{...styles.container, ...propStyle}} onClick={() => navigate("/game-details")}>
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


    </div>
  )
}

export default GameDetailCardHeader
