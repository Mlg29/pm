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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userState } from "../../redux/slices/AuthSlice";
import { getFxRate } from "../../redux/slices/MiscSlice";

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
  const [exAmount, setExAmount] = useState<any>("");
  const navigate = useNavigate();
  const userFee = JSON.parse(localStorage.getItem("inviteeInfo"))
  const [allowCurrency, setAllowCurrency] = useState(false)
  const [loader, setLoader] = useState(false)
  const userData = useAppSelector(userState)
  const dispatch = useAppDispatch()


  const handleExRate = async (amt) => {
    const rateData = {
      sourceCurrency: userData?.defaultCurrency === "USD" ? "USD" : "NGN",
      destinationCurrency: userData?.defaultCurrency === "USD" ? "NGN" : "USD",
      amount: amt
    }
    const newAmount = await dispatch(getFxRate(rateData)).then(pp => {
      const expectedAmount = pp?.payload?.data?.rate * amt
      return expectedAmount
    })

    setExAmount(newAmount)


  };



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


  const handleCardAmount = (amt) => {
    let result = amt?.replace(/null|undefined/g, "")
    setAmount(result)
    handleExRate(result)
  }

  const handleAmount = (val) => {
    let result = val?.replace(/null|undefined/g, "")
    setAmount(result)
    handleExRate(result)

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
        <h3 style={{ ...FONTS.h6 }}>{userData?.defaultCurrency === "NGN" ? "₦" : userData?.defaultCurrency === "USD" ? "$" : ""}{formatCurrency(userFee?.amount)} <span style={{ color: 'gray' }}>({userFee?.initialData?.betCurrency === "NGN" ? "₦" : userFee?.initialData?.betCurrency === "USD" ? "$" : ""}{formatCurrency(userFee?.initialData?.betAmount)})</span></h3>


      </div>

      {
        exAmount ?
          <div style={{ backgroundColor: COLORS.cream, width: 120, padding: 2 }}>
            <p style={{ textAlign: 'center' }}>{userData?.defaultCurrency === "USD" ? "₦" : "$"}{exAmount ? formatCurrency(exAmount) : null}</p>
          </div>
          : null
      }

      <div>

        <input
          style={{ ...styles.inputs, display: 'none' }}
          value={amount}
          onChange={(e) => handleAmount(e?.target?.value)}
          placeholder="0.00"
          disabled
        />
        <InputNumber
          value={amount}
          prefix={userData?.defaultCurrency === "NGN" ? "₦" : "$"}
          onValueChange={(e) => handleAmount(e.value)}
          minFractionDigits={2}
          disabled
          inputStyle={{ ...styles.inputs }}
          placeholder={userData?.defaultCurrency === "NGN" ? "₦0.00" : "$0.00"}
        />
      </div>

      <CustomeKeyboard value={amount} setValue={handleCardAmount} int />

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
