
import { useNavigate } from "react-router-dom"
import arrowleft from "../../assets/images/arrow-left.svg"
import { COLORS } from "../../utils/colors"


const styles = {
    row: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 20,
        width: 90,
        padding: 10,
        borderRadius: 20
    }
}

function DesktopBackButton() {
    const navigate = useNavigate()
  return (
    <div style={{...styles.row, cursor: "pointer"}} onClick={() => navigate(-1)}>
      <img src={arrowleft} style={{ padding: "0px", borderRadius: 100 }} />
      <p>Back</p>
    </div>
  )
}

export default DesktopBackButton
