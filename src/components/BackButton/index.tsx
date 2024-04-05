
import { useNavigate } from "react-router-dom"
import arrowleft from "../../assets/images/arrow-left.svg"
import { COLORS } from "../../utils/colors"


function BackButton() {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(-1)}>
      <img src={arrowleft} style={{ padding: "16px", background: COLORS.semiGray, borderRadius: 100 }} />
    </div>
  )
}

export default BackButton
