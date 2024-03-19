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
    const { label, required, type,value, handleChange } = props

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <div style={{ ...styles.row, width: "300px" }}>
            <button onClick={onClick} style={{ width: "100%", textAlign: "left", background: "transparent", outline: "none", border: "none" }} ref={ref}>
                {value}
            </button>
            <LuCalendarDays size={30} onClick={onClick} />
        </div>

    ));

    return (
        <div>
              <label style={{ ...FONTS.body5 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
            />
        </div>
    )
}

export default DatePickerComponent
