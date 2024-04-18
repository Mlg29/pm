import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import user from "../../assets/images/user.svg"
import { useNavigate } from "react-router-dom"


const styles = {
    container: {
        borderRadius: 10,
        border: `1px solid ${COLORS.gray}`,
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0px 0px 20px 0px"
    },
    row: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0px"
    }
}

function SlipCard(props: any) {
    const {amount, homeImage, awayImage, homeScore, awayScore, homeName, awayName, isWin, isUser} = props
 const navigate = useNavigate()
 
    return (
    <div style={{...styles.container, cursor: "pointer"}} onClick={() => navigate("/bet-detail")}>
        <div>
            <div style={{...styles.row}}>
                <img src={homeImage} width={20} />
                <h3 style={{...FONTS.body6,width: 100, margin: "0px 0px 0px 5px" }}>{homeName}</h3>
                <h3 style={{...FONTS.h6,textAlign: "center" }}>{homeScore}</h3>
            </div>
            <div style={{...styles.row}}>
                <img src={awayImage} width={20} />
                <h3 style={{...FONTS.body6,width: 100, margin: "0px 0px 0px 5px" }}>{awayName}</h3>
                <h3 style={{...FONTS.h6, textAlign: "center", }}>{awayScore}</h3>
            </div>
            {
                isUser ?  <div style={{...styles.row}}>
                <img src={user} width={20} />
                <h3 style={{...FONTS.h6, margin: "0px 0px 0px 5px" }}>@JohnDdon</h3>
            </div>
            : null
            }
        </div>
        <h3 style={{...FONTS.h5, color: isWin ? COLORS.green : COLORS.red  }}>{isWin ? "+" : "-"}{amount}</h3>
    </div>
  )
}

export default SlipCard
