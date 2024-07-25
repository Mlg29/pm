import { InputNumber } from 'primereact/inputnumber';
import { FONTS } from '../../utils/fonts';
import { useState } from 'react';


const NumberInput = ({value, setValue, label, required, placeholder}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
                <label style={{ ...FONTS.body7, marginBottom: 5 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
                <div style={{border: '0.5px solid gray', borderRadius: 10}}>
                     <InputNumber inputId="integeronly" minFractionDigits={2} value={value} onChange={(e) => setValue(e.value)} placeholder={placeholder} style={{height: 60}} />
                </div>
               
        </div>
    )
}

export default NumberInput