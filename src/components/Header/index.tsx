import { MdArrowBackIos } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"




function Header({text}: any) {
    const navigate = useNavigate()

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <div style={{ marginTop: 10 }} onClick={() => navigate(-1)}>
        <MdArrowBackIos size={20} style={{ padding: "16px", background: COLORS.semiGray, borderRadius: 100 }} />
      </div>
      <h3 style={{...FONTS.h5, margin: "0px"}}>{text}</h3>
      <h3></h3>
    </div>
  )
}

export default Header
