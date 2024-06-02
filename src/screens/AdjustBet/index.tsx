import { useState } from "react";
import CustomeKeyboard from "../../components/CustomKeyboard";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { TextAlign } from "../../utils/type";
import { formatCurrency } from "../../utils/helper";

const styles = {
  inputs: {
    width: "100%",
    padding: 30,
    border: "none",
    outline: "none",
    textAlign: "center" as TextAlign,
    fontSize: "40px",
    fontWight: "600",
    fontFamily: "Poppins",
    color: "black",
    backgroundColor: "transparent",
  },
};

const AdjustBet = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const userFee = JSON.parse(localStorage.getItem("inviteeInfo"))





  const handleRoute = () => {
    const payload = {
      invitedUser: null,
      amount: userFee?.amount,
      opponentUsername: userFee?.opponentUsername,
      adjustedBetAmount: parseInt(amount),
      isAdjustBet: true,
      betId: userFee?.betId
    };
    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  }

  return (
    <div className="top-container">
      <Header text="Adjust Bet Stake" />

      <p style={{ ...FONTS.body6, margin: "0rem 0px" }}>
        Please specify the amount you wish to adjust your bet stake
      </p>

      <div
        style={{
          backgroundColor: COLORS.cream,
          padding: "15px 20px",
          margin: "1rem 0px 2rem 0px",
          borderRadius: 20,
        }}
      >
        <p style={{ ...FONTS.body7, color: COLORS.gray, marginBottom: "10px" }}>
          @{userFee?.opponentUsername} Bet Amount
        </p>
        <h3 style={{ ...FONTS.h6 }}>₦{formatCurrency(userFee?.amount)}</h3>
      </div>

      <div>
   
        <input
          style={{ ...styles.inputs }}
          value={amount}
          onChange={(e) => setAmount(e?.target?.value)}
          placeholder="0.00"
        />
      </div>

      <CustomeKeyboard value={amount} setValue={setAmount} />

      <div style={{ width: "100%", marginTop: 30 }}>
        <Button
          text="Next"
          propStyle={{ width: "100%" }}
          handlePress={() => handleRoute()}
        />
      </div>
    </div>
  );
};

export default AdjustBet;
