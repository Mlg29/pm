
import emptyState from "../../assets/images/empty.svg"
import { FONTS } from "../../utils/fonts"


function EmptyState(props: any) {
    const {header, text, height} = props
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",height: height ? height : "70vh"}}>
        <img src={emptyState} />
        <h3 style={{...FONTS.h5, textAlign: "center"}}>{header}</h3>
        <p style={{...FONTS.body6, margin: '10px 0px'}}>{text}</p>
    </div>
  )
}

export default EmptyState
