import { useContext, useEffect, useState } from "react";
import CustomeKeyboard from "../../components/CustomKeyboard";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { TextAlign } from "../../utils/type";
import { formatCurrency } from "../../utils/helper";
import { InputNumber } from 'primereact/inputnumber';
import Loader from "../../components/Loader";
import { IPInfoContext } from "ip-info-react";

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
  const [amount, setAmount] = useState<any>("");
  const navigate = useNavigate();
  const userFee = JSON.parse(localStorage.getItem("inviteeInfo"))
 const [allowCurrency, setAllowCurrency] = useState(false)
 const [loader, setLoader] = useState(false)
 const userIp = useContext(IPInfoContext);


 const checkHandler = () => {
  setAllowCurrency(!allowCurrency)
}

useEffect(() => {
  setLoader(true)
  setTimeout(() => {
    setLoader(false)
  }, 1000)
}, [])


  const handleRoute = () => {
    const payload = {
      invitedUser: null,
      amount: userFee?.amount,
      opponentUsername: userFee?.opponentUsername,
      adjustedBetAmount: parseFloat(amount),
      isAdjustBet: true,
      betId: userFee?.betId,
      allowOtherCurrency: allowCurrency
    };

    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  }


  const handleAmount = (val) => {
   // console.log({val})
    // setAmount(val)
  }

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "50vh",
        }}
      >
        <Loader />
      </div>
    );
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

     {/* <div>
     <div style={{display: "flex", alignItems: "center"}}>
      <div style={{width: "30px"}} >
         <input type="checkbox" onChange={checkHandler} checked={allowCurrency}  />
      </div>
        <p>Allow Other Currency</p>
      </div>
     </div> */}

      <div>
   
        <input
          style={{ ...styles.inputs, display: 'none' }}
          value={amount}
          onChange={(e) => setAmount(e?.target?.value)}
          placeholder="0.00"
        />
        <InputNumber 
          value={amount} 
          prefix={userIp?.currency === "NGN" ? "₦" : "$"}
          onValueChange={(e) => handleAmount(e.value)} 
          minFractionDigits={2} 
          inputStyle={{ ...styles.inputs }}
          placeholder={userIp?.currency === "NGN" ? "₦0.00" : "$0.00"}
          />
      </div>

      <CustomeKeyboard value={amount} setValue={setAmount} int />

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
