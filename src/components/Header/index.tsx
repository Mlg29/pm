import { MdArrowBackIos } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import arrowleft from "../../assets/images/arrow-left.svg"
import { useMediaQuery } from "react-responsive"



function Header({text}: any) {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: "0px 0px 2rem 0px"}}>
    {
      isMobile ?   <div style={{ marginTop: 10, cursor: "pointer" }} onClick={() => {
        navigate(-1)
         }}>
         <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />
       </div>
       : <div />
    }
      <h3 style={{...FONTS.h5, margin: "0px"}}>{text}</h3>
      <h3></h3>
      
    </div>
  )
}

export default Header
