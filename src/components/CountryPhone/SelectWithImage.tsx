import React, { useState, useEffect } from "react";
import { getCountryListMap } from "country-flags-dial-code";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  select: {
    padding: "18px 5px",
    borderRadius: 10,
    margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
    backgroundColor: "white",
    outline: "none",
    height: "55px",
  },
};

const SelectWithImage = ({countryList, value,disabled, setValue, isCountryRequired}) => {

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setValue(value)
      };


  return (
    <div style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>Select Country <span>{isCountryRequired && <span style={{color: 'red'}}>*</span>  }</span></label>

      <select disabled={disabled} style={{ ...styles.select, color: disabled ? COLORS.gray : COLORS.primary }}
        onChange={(e) => handleSelectChange(e)}
        value={value}
      >
        <option>Select Country</option>
        {
            countryList?.map((data, i) => {
                return <option key={i} value={data?.country}>
                    {data?.country}
                    </option>
            })
        }
      </select>
    </div>
  );
};

export default SelectWithImage;
