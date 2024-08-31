import React, { useRef, useState } from "react";
import { FlexDirection, Position } from "../utils/type";
import { LuLoader } from "react-icons/lu";
import profile from "../assets/images/profile1.png";
import edit from "../assets/images/edit.svg";
import Loader from "./Loader";
import male from "../assets/images/male.svg";
import female from "../assets/images/female.svg";

const styles = {
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px",
  },
  edit: {
    position: "relative" as Position,
    bottom: 20,
    left: 20,
  },
};
const CustomFileInput = (props: any) => {
  const {
    fileInputRef,
    handleFileChange,
    handleButtonClick,
    imageLoader,
    userData,
    fileUrl,
  } = props;

  return (
    <div className="custom-file-input">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div style={{ ...styles.center }}>
        {imageLoader ? <Loader /> : (
          <div>
            {fileUrl ? (
              <img
                src={fileUrl}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
                alt=""
              />
            ) : (
              userData?.gender === "male" ? (
                <img src={male} />
              ) : (
                <img src={female} />
              )
            )}
          </div>
        )}

        <img
          src={edit}
          style={{ ...styles.edit }}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default CustomFileInput;
