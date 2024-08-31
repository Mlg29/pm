

import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts"

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';



export const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        backgroundColor: "white"
    },
    select: {
        padding: "18px 5px",
        borderRadius: 10,
        margin: "5px 0px 0px 0px",
        border: `0.1px solid ${COLORS.gray}`,
        backgroundColor: "white",
        outline: "none",
        height: "55px"
    }
}

function Dropdown(props: any) {
    const { data, handleSelect,value, label,disabled, placeholder, required } = props

    return (
        <div style={{ ...styles.container,marginBottom: 10 }}>
           <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <select disabled={disabled}  onChange={(e) => handleSelect(e)} value={value} style={{...styles.select, color: disabled ? COLORS.gray : COLORS.primary,}}>
                <option>{placeholder}</option>
                {
                    data?.map((info: any) => {
                        return <option key={info?.id} value={info?.id}>{info?.value}</option>
                    })
                }

            </select>
        </div>
    )
}

export default Dropdown
