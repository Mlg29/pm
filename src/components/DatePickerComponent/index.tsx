import { styles } from "./style.js";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts.js";
import { Calendar } from "primereact/calendar";

const DatePickerComponent = (props: any) => {
  //   const [startDate, setStartDate] = useState(new Date());
  const {
    label,
    required,
    type,
    value,
    onChangeDate,
    calculateDefaultDate,
    disabled,
    propStyle,
  } = props;
  // const minDate = calculateDefaultDate;
  // const years = Array.from(new Array(100), (val, index) => 2024 - index); // Creates an array of years from 2024 to 1925
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const renderCustomHeader = ({
  //   date,
  //   changeYear,
  //   changeMonth,
  //   decreaseMonth,
  //   increaseMonth,
  //   prevMonthButtonDisabled,
  //   nextMonthButtonDisabled,
  // }) => (
  //   <div
  //     style={{
  //       ...styles.row,
  //       width: "300px",
  //       ...propStyle,
  //       background: disabled ? COLORS.semiGray : "none",
  //     }}
  //   >
  //     <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
  //       {"<"}
  //     </button>
  //     <select
  //       value={date.getFullYear()}
  //       onChange={({ target: { value } }) => changeYear(value)}
  //       style={{ color: "black" }}
  //     >
  //       {years.map((option) => (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       ))}
  //     </select>

  //     <select
  //       value={months[date.getMonth()]}
  //       onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
  //       style={{ color: "black" }}
  //     >
  //       {months.map((option) => (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       ))}
  //     </select>
  //     <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
  //       {">"}
  //     </button>
  //   </div>
  // );

  // const [date, setDate] = useState(null);

  return (
    // <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
    //   <label style={{ ...FONTS.body7 }}>
    //     {label} {required ? <span style={{ color: "red" }}>*</span> : null}
    //   </label>
    //   <div style={{border: `1px solid ${COLORS.gray}`, margin: "5px 0px 0px 0px", padding: "10px", borderRadius: "10px"}}>
    //     <DatePicker
    //       selected={value}
    //       onChange={onChangeDate}
    //       renderCustomHeader={renderCustomHeader}
    //       className="pick"
    //       minDate={minDate}
    //     />
    //   </div>
    // </div>
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>
        {label} {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <Calendar value={value} onChange={(e) => onChangeDate(e.value)} showIcon  showButtonBar style={{height: 60}} />
    </div>
  );
};

export default DatePickerComponent;
