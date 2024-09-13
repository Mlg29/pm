import { styles } from "./style.js";
import React, { useState } from "react";

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
    <div style={{ width: "100%", display: "flex", flexDirection: "column", }}>
      <label style={{ ...FONTS.body7 }}>
        {label} {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <Calendar value={value} onChange={(e) => onChangeDate(e.value)} className="btns" ariaLabel="Date" placeholder={placeholder}  showButtonBar style={{height: 60, border: '0.1px solid gray', borderRadius: 5}} />
    </div>
  );
};

export default DatePickerComponent;
