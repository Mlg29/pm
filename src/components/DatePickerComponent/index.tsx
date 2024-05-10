// @ts-ignore
import { styles } from "./style.js"
import { forwardRef, useState } from "react";
// @ts-ignore
import DatePicker from "react-datepicker";
import { LuCalendarDays } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
import { COLORS } from "../../utils/colors.js"
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"


function DatePickerComponent(props: any) {
    const { label, required, type,value, onChangeDate,disabled, propStyle } = props

   
    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <div style={{ ...styles.row, width: "300px", ...propStyle, background: disabled ? COLORS.semiGray : "none" }}>
            <button onClick={disabled ? () => {} : onClick} style={{ width: "100%", textAlign: "left", background: "transparent", outline: "none", border: "none" }} ref={ref}>
                {/* {value} */}
                <p style={{...FONTS.body6, margin: "0px", color: COLORS.primary}}>{value}</p>
            </button>
            <LuCalendarDays size={25} onClick={onClick} color={COLORS.primaryGray} />
        </div>

    ));

    return (
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <DatePicker
                selected={value}
                onChange={(date: any) => onChangeDate(date)}
                customInput={<ExampleCustomInput />}
            />
        </div>
    )
}

export default DatePickerComponent
