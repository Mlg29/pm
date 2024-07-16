import { styles } from "./style.js";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts.js";
import { Calendar } from "primereact/calendar";

const DatePickerComponent = (props: any) => {

  const {
    label,
    required,
    type,
    value,
    onChangeDate,
    calculateDefaultDate,
    disabled,
    propStyle,
    placeholder
  } = props;
  

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>
        {label} {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <Calendar value={value} onChange={(e) => onChangeDate(e.value)} className="btns" ariaLabel="Date" placeholder={placeholder}  showButtonBar style={{height: 60}} />
    </div>
  );
};

export default DatePickerComponent;
