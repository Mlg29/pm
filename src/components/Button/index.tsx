
// @ts-ignore
import {styles} from "./style.js"
// @ts-ignore
import { COLORS} from "../../utils/colors.js"
// @ts-ignore
import {FONTS} from "../../utils/fonts.js"

function Button(props: any) {
    const {text, propStyle, handlePress} = props
  return (
    <div>
      <button 
        onClick={handlePress}
        style={{
            background: COLORS.primary, 
            outline: "none",
            border: "none",
            ...styles.container, 
            ...FONTS.h5,
            color: COLORS.white,
            ...propStyle,
            }}>
        {text}
      </button>
    </div>
  )
}

export default Button
