import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";

import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";
import success from "../../assets/images/success.svg";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    padding: "0px 20px",
    flex: 1,
    height: "100%",
  },
  line: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px 0px 20px",
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  inactive: {
    backgroundColor: COLORS.semiGray,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
  },
};

function AuthSuccess() {
  const [step, setStep] = useState(4);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  const handleLogin = () => {
    const exceptValue = localStorage.getItem("bet-invite-id");
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear();
    localStorage.setItem("deviceId", getDeviceId)
    if (exceptValue !== null) {
      localStorage.setItem("bet-invite-id", exceptValue);
    }
    navigate("/login");
  };

  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <img src={success} />

          <div>
            <h3
              style={{
                ...FONTS.h2,
                fontWeight: "bold",
                textAlign: "center",
                margin: "10px 0px",
              }}
            >
              Wow! You Did It.
            </h3>
            <p
              style={{ ...FONTS.body5, textAlign: "center", fontWeight: "400" }}
            >
              Success! Your have successfully created your account.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              propStyle={{ width: "100%" }}
              handlePress={() => handleLogin()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthSuccess;
