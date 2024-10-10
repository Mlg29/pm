import React, { useState, useEffect } from "react";
import { getCountryListMap } from "country-flags-dial-code";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { Select } from "antd";

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

const SelectWithImage = ({
  countryList,
  value,
  disabled,
  setValue,
  isCountryRequired,
}) => {
  const handleSelectChange = (e) => {
    const value = e;
    setValue(value);
  };
  const cL = countryList?.map((dd) => {
    return {
      id: dd?.dialCode,
      value: dd?.country,
    };
  });
 

  return (
    <div style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}>
      <label style={{ ...FONTS.body7 }}>
        Select Country{" "}
        <span>
          {isCountryRequired && <span style={{ color: "red" }}>*</span>}
        </span>
      </label>

      <Select
        showSearch
        placeholder={"Select Country"}
        allowClear
        onChange={(e) => handleSelectChange(e)}
        style={{
          ...styles.select,
          color: disabled ? COLORS.gray : COLORS.primary,
        }}
        autoClearSearchValue
        filterOption={(input: any, option: any) =>
          (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={cL}
      />
    </div>
  );
};

export default SelectWithImage;
