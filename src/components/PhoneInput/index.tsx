
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
// @ts-ignore
import { styles } from "./style.js"
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"
import { COLORS } from '../../utils/colors.js'


function PhoneInputComponent({ label,value, required,onChangeText, errorMsg}: any) {
  //  const [value, setValue] = useState<any>()


    return (
        <div style={{marginBottom: 10}}>
            <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <div style={{ ...styles.container }}>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    defaultCountry="NG"
                    style={{ padding: 5, color: COLORS.primary }}
                    onChange={onChangeText} />
            </div>
            {
                errorMsg && <p style={{fontSize: 10, color: 'red', marginTop: 5}}>{errorMsg}</p>

            }
        </div>

    )
}

export default PhoneInputComponent
