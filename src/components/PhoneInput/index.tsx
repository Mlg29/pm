
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
// @ts-ignore
import { styles } from "./style.js"
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"


function PhoneInputComponent({ label, required }: any) {
    const [value, setValue] = useState<any>()


    return (
        <div style={{marginBottom: 10}}>
            <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <div style={{ ...styles.container }}>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    defaultCountry="NG"
                    style={{ padding: 5 }}
                    onChange={setValue} />
            </div>
        </div>

    )
}

export default PhoneInputComponent
