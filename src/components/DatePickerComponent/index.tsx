// // @ts-ignore
// import { styles } from "./style.js"
// import { forwardRef, useState } from "react";
// // @ts-ignore
// import DatePicker from "react-datepicker";
// import { LuCalendarDays } from "react-icons/lu";
// import "react-datepicker/dist/react-datepicker.css";
// // @ts-ignore
// import { COLORS } from "../../utils/colors.js"
// // @ts-ignore
// import { FONTS } from "../../utils/fonts.js"

// function DatePickerComponent(props: any) {
//     const { label, required, type,value, onChangeDate,disabled, propStyle } = props

//     const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
//         <div style={{ ...styles.row, width: "300px", ...propStyle, background: disabled ? COLORS.semiGray : "none" }}>
//             <button onClick={disabled ? () => {} : onClick} style={{ width: "100%", textAlign: "left", background: "transparent", outline: "none", border: "none" }} ref={ref}>
//                 {/* {value} */}
//                 <p style={{...FONTS.body6, margin: "0px", color: COLORS.primary}}>{value}</p>
//             </button>
//             <LuCalendarDays size={25} onClick={onClick} color={COLORS.primaryGray} />
//         </div>

//     ));

//     return (
//         <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
//             <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
//             <DatePicker
//                 selected={value}
//                 onChange={(date: any) => onChangeDate(date)}
//                 customInput={<ExampleCustomInput />}

//             />
//         </div>
//     )
// }

// export default DatePickerComponent

import { styles } from "./style.js";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts.js";

const DatePickerComponent = (props: any) => {
  //   const [startDate, setStartDate] = useState(new Date());
  const { label, required, type, value, onChangeDate, disabled, propStyle } =
    props;

  const years = Array.from(new Array(100), (val, index) => 2024 - index); // Creates an array of years from 2024 to 1925
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        ...styles.row,
        width: "300px",
        ...propStyle,
        background: disabled ? COLORS.semiGray : "none",
      }}
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
        style={{color: "black"}}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
        style={{color: "black"}}
     >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  );

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>
        {label} {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <div style={{border: `1px solid ${COLORS.gray}`, margin: "5px 0px 0px 0px", padding: "10px", borderRadius: "10px"}}>
        <DatePicker
          selected={value}
          onChange={onChangeDate}
          renderCustomHeader={renderCustomHeader}
          className="pick"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
