// @ts-ignore
import { styles } from "./style.js"
import { LuAtSign } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai"
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"
import { useState } from "react";
import { COLORS } from "../../utils/colors.js";

function TextInput(props: any) {
    const { label, placeholder, required, type,value, handleChange } = props
   const [show, setShow] = useState(false)
   
    return (
        <div style={{marginBottom: 10}}>
            <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <div style={{ ...styles.row }}>
                {
                    type === "username" ?
                        <div style={{margin: "0px 3px 0px 0px"}}>
                            <LuAtSign color={COLORS.primaryGray} size={15} />
                        </div>
                        : null
                }
                <input
                    value={value}
                    style={{
                        ...styles.container

                    }}
                    type={show ? "text" : type === "password" ? "password": "text"}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e?.target?.value)}
                />
                {
                    type === "password" ?
                        <div style={{display: 'flex', flexDirection: 'row'}}>
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
