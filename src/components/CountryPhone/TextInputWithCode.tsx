import React from "react";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import { COLORS } from "../../utils/colors";

const styles = {
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    borderRadius: 10,
    margin: "5px 0px 0px 0px",
    padding: '0px 10px',
    border: `0.1px solid ${COLORS.gray}`,

  },
  rowDiv: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    padding: "15px 5px",
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
   
}
};

const TextInputWithCode = ({ countryListCode, value, setValue, isPhoneRequired }) => {
  return (
    <div style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>Phone Number <span>{isPhoneRequired && <span style={{color: 'red'}}>*</span>  }</span></label>
      <div style={{ ...styles.row}}>
        <div style={{padding: '0px 5px'}}>
          <p>{countryListCode?.dialCode}</p>
        </div>
        <input 
          style={{...styles.rowDiv}}
          className="inputs-d"
          value={value}
          onChange={(e) => setValue(e?.target.value)}
        />
      </div>
    </div>
  );
};

export default TextInputWithCode;
