import { LuAtSign } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
// @ts-ignore
import { FONTS } from "../../utils/fonts.js";
import { useState } from "react";
import { COLORS } from "../../utils/colors.js";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    width: "90%",
    border: "none",
    background: "none",
    outline: "none",
    padding: "0px 5px",
    color: COLORS.primary,
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    padding: "15px 5px",
    borderRadius: 10,
    margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
  },
};

function CurrencyInput(props: any) {
  const {
    label,
    placeholder,
    required,
    type,
    value,
    disabled,
    onChangeText,
    errorMsg,
    isNumeric,
    userData
  } = props;
  const [show, setShow] = useState(false);


  const formatNumber = (value) => {
    return new Intl.NumberFormat().format(value.replace(/,/g, ""));
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;


    if (isNumeric) {
      inputValue = inputValue.replace(/[^0-9]/g, "");
    }

    if (isNumeric && inputValue !== "") {
      inputValue = formatNumber(inputValue);
    }


    onChangeText(inputValue);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ ...FONTS.body7 }}>
        {label} {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <div
        style={{
          ...styles.row,
          backgroundColor: disabled ? COLORS.semiGray : "none",
        }}
      >
        {type === "username" ? (
          <div
            style={{
              margin: "0px 3px 0px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LuAtSign color={COLORS.primaryGray} size={15} />
          </div>
        ) : null}
        {type === "amount" ? (
          <div
            style={{
              margin: "0px 3px 0px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p>{userData?.defaultCurrency === "NGN" ? "₦" : "$"}</p>
          </div>
        ) : null}
        <input
          value={value}
          className="inputs"
          style={{
            ...styles.container,
            color: disabled ? COLORS.gray : COLORS.black,
          }}
          disabled={disabled}
          type={show ? "text" : type === "password" ? "password" : "text"}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        {type === "password" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {!show ? (
              <AiOutlineEyeInvisible size={20} onClick={() => setShow(!show)} />
            ) : (
              <AiOutlineEye size={20} onClick={() => setShow(!show)} />
            )}
          </div>
        ) : null}
      </div>
      {errorMsg && (
        <p style={{ fontSize: 10, color: "red", marginTop: 5 }}>{errorMsg}</p>
      )}
    </div>
  );
}

export default CurrencyInput;
