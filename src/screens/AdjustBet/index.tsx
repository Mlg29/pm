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
import arrowleft from "../../assets/images/arrow-left.svg"


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
  const [exLoader, setExLoader] = useState(false)
  const userData = useAppSelector(userState)
  const dispatch = useAppDispatch()


  const handleExRate = async (amt) => {
    const rateData = {
      sourceCurrency: userData?.defaultCurrency === "USD" ? "USD" : "NGN",
      destinationCurrency: userData?.defaultCurrency === "USD" ? "NGN" : "USD",
      amount: parseFloat(amt)
    }

    setExLoader(true)
    const newAmount = await dispatch(getFxRate(rateData)).then(pp => {
      const expectedAmount = pp?.payload?.data?.rate * amt

      setExLoader(false)
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
    if (userFee?.initialData?.betCurrency !== userData?.defaultCurrency && !exAmount) {
      alert("Please wait.. Exchange rate fetching amount")
      return
    }
    const payload = {
      invitedUser: null,
      amount: userFee?.amount,
      initialData: userFee?.initialData,
      opponentUsername: userFee?.opponentUsername,
      adjustedBetAmount: parseFloat(amount),
      adjustedBetAmountInExchange: parseFloat(exAmount),
      isAdjustBet: true,
      betId: userFee?.betId,
      userInvitePrediction: userFee?.userPrediction,
      betCurrency: userFee?.initialData?.betCurrency,
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

  // console.log({ userFee })

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
      {/* <div style={{ marginTop: 10, cursor: "pointer" }} onClick={() => {
        navigate(-1)
      }}>
        <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />

      </div> */}
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
        {
          userData?.defaultCurrency === userFee?.initialData?.betCurrency ? <>
            <h3 style={{ ...FONTS.h6 }}>
              {
                isNaN(userFee?.amount) ? null
                  :
                  <span>{userData?.defaultCurrency === "NGN" ? "₦" :
                    userData?.defaultCurrency === "USD" ? "$" : ""}</span>
              }
              {
                isNaN(userFee?.amount) ? null : `${formatCurrency(userFee?.amount)}`
              }
            </h3>
          </>
            :
            <h3 style={{ ...FONTS.h6 }}>
              {
                isNaN(userFee?.amount) ? null
                  :
                  <span>{userData?.defaultCurrency === "NGN" ? "₦" :
                    userData?.defaultCurrency === "USD" ? "$" : ""}</span>
              }

              {
                isNaN(userFee?.amount) ? null : `${formatCurrency(userFee?.amount)} =`
              }
              <span style={{ color: 'gray' }}> {userFee?.initialData?.betCurrency === "NGN" ? "₦" : userFee?.initialData?.betCurrency === "USD" ? "$" : ""}
                {formatCurrency(userFee?.initialData?.betAmount || userFee?.initialData?.opponentBetAmount)}</span>
            </h3>
        }


      </div>



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

        {
          isNaN(userFee?.amount) ? null :
            <div>
              {
                exLoader ?
                  <div style={{ padding: 2, display: 'flex', marginTop: -30, justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                  </div>
                  :
                  <div>
                    {
                      exAmount ?
                        <div style={{ padding: 2, display: 'flex', marginTop: -30, justifyContent: 'center', alignItems: 'center' }}>
                          <p style={{ textAlign: 'center' }}>{userData?.defaultCurrency === "USD" ? "₦" : "$"}{exAmount ? formatCurrency(exAmount) : null}</p>
                        </div>
                        : null
                    }
                  </div>
              }

            </div>
        }
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
