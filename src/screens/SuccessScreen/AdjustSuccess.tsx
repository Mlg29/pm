import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import { MdSmsFailed } from "react-icons/md";
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
    margin: "2rem 0px 10px 0px",
  },
};

function AdjustSuccess() {
  const [step, setStep] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState("");
  const betId = location?.state?.betId;
  const type = location?.state?.type;

  return (
    <div className="top-container" style={{ ...styles.container }}>
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
          
          <img src={success} style={{ marginBottom: "3rem" }} />

          <div>
            <h3
              style={{
                ...FONTS.h4,
                fontWeight: "600",
                textAlign: "center",
                margin: "10px 0px",
              }}
            >
              {type === "REJECTED"
                ? "Bet Rejected"
                : "Bet Adjusted"}
            </h3>
            <p
              style={{ ...FONTS.body6, textAlign: "center", fontWeight: "400" }}
            >
              Hurray! You have successfully{" "}
              {type === "REJECTED"
                ? "rejected"
                : "adjusted"}{" "}
              a bet from your account.
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
              text="Go back Home"
              propStyle={{ width: "100%" }}
              handlePress={() => navigate("/home")}
            />
            <div style={{ marginBottom: 10 }} />
            {type !==  "REJECTED" ? (
              <Button
                text="View Bet Slip"
                propStyle={{
                  width: "100%",
                  backgroundColor: COLORS.cream,
                  color: COLORS.primary,
                }}
                handlePress={() =>
                  navigate(`/bet-detail?${betId}`, {
                    state: { betInfo: betId },
                  })
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdjustSuccess;
