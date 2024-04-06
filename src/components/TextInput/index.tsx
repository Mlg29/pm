
import { LuAtSign } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai"
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"
import { useState } from "react";
import { COLORS } from "../../utils/colors.js";

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';


export const styles = {
    container: {
        width: "90%",
        border: "none",
        background: "none",
        outline: "none",
        padding: "5px 5px",
        color: COLORS.primary
    },
    row: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        alignItems: "center",
        padding: "15px 5px",
        borderRadius: 10,
        margin: "5px 0px 0px 0px",
        border: `0.1px solid ${COLORS.gray}`
    }
}


function TextInput(props: any) {
    const { label, placeholder, required, type,value,disabled, handleChange } = props
   const [show, setShow] = useState(false)
   
    return (
        <div style={{marginBottom: 10}}>
            <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <div style={{ ...styles.row, backgroundColor: disabled ? COLORS.semiGray : "none" }}>
                {
                    type === "username" ?
                        <div style={{margin: "0px 3px 0px 0px",  display: "flex", justifyContent: 'center'}}>
                            <LuAtSign color={COLORS.primaryGray} size={15} />
                        </div>
                        : null
                }
                <input
                    value={value}
                    style={{
                        ...styles.container,
                    }}
                    disabled={disabled}
                    type={show ? "text" : type === "password" ? "password": "text"}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e?.target?.value)}
                    
                />
                {
                    type === "password" ?
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', cursor: "pointer"}}>
                           {
                            !show ? <AiOutlineEyeInvisible size={20} onClick={() => setShow(!show)} />
                            : <AiOutlineEye size={20} onClick={() => setShow(!show)} />
                           }
                                
                        </div>
                        : null
                }

            </div>

        </div>
    )
}

export default TextInput
