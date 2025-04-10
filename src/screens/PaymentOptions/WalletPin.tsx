import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import { FONTS } from "../../utils/fonts";
import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { acceptBet, adjustBet, createBet } from "../../redux/slices/BetSlice";
import { getUserData, verifyTransactionPin } from "../../redux/slices/AuthSlice";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { IPInfoContext } from "ip-info-react";


function WalletPin() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const userFee = JSON.parse(localStorage.getItem("inviteeInfo"));
  const getUserBet = JSON.parse(localStorage.getItem("userBetSelection"));
  const [userData, setUserData] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const userIp = useContext(IPInfoContext);

  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    } else {
      handleLogOut()
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);



  const handleSubmit = async () => {
    // if (userIp?.country_code === "US") {
    //   toast.error("Placing of bet is restricted for this country", {
    //     position: "bottom-center",
    //   });
    //   return;
    // }
    if (otp?.length < 6) {
      toast.error("Transaction Pin is required", {
        position: "bottom-center",
      });
      return;
    }
    if ((parseFloat(userData?.maxBetAmountRestriction?.maxBetAmount) < parseFloat(userFee?.amount)) && userData?.maxBetAmountRestriction?.useRestrictions) {
      toast.error("Maximum Bet Amount Exceeded", {
        position: "bottom-center",
      });
      return;
    }
    const payload = {
      opponentId: userFee?.invitedUser ? userFee?.invitedUser : null,
      sportEventId: getUserBet?.sportEventId,
      betAmount: parseFloat(userFee?.amount),
      betCurrency: userData?.defaultCurrency === "NGN" ? "NGN" : "USD",
      prediction: getUserBet?.userType,
      sport: getUserBet?.sport,
      betType: userFee?.invitedUser ? "PRIVATE" : "OPEN",
      matchEvent: getUserBet?.matchEvent,
      allowOtherCurrency: userFee?.allowOtherCurrency
    };

    const adjustPayload = {
      betId: userFee?.betId,
      //requestedAmount: userFee?.initialData.betCurrency === userData?.defaultCurrency ? parseFloat(userFee?.adjustedBetAmount) : parseFloat(userFee?.adjustedBetAmountInExchange),
      requestedAmount: parseFloat(userFee?.adjustedBetAmount),
      requestedPrediction: getUserBet?.userType || userFee?.userInvitePrediction,
    }



    const acceptPayload = {
      id: userFee?.betId,
      prediction: userFee?.prediction,
      betAmount: parseFloat(userFee?.amount),
      sport: getUserBet?.sport || userFee?.sport
    }


    const transactionPayload = {
      transactionPin: otp
    }
    // console.log({ acceptPayload, getUserBet, userFee })
    setLoader(true);

    const verifyResponse = await dispatch(verifyTransactionPin(transactionPayload))
    if (verifyTransactionPin.fulfilled.match(verifyResponse)) {
      if (userFee?.isAdjustBet) {
        const response = await dispatch(adjustBet(adjustPayload))
        if (adjustBet.fulfilled.match(response)) {
          setLoader(false);
          // console.log({adjustPayload, response})
          return navigate("/bet-success", {
            state: { betId: response?.payload?.data?.id, type: "adjust" }
          });
        } else {
          var errMsg = response?.payload as string;
          setLoader(false);
          setOtp("")
          toast.error(errMsg, {
            position: "bottom-center",
          });
        }
      }
      else if (userFee?.isAcceptBet) {
        const response = await dispatch(acceptBet(acceptPayload))
        if (acceptBet.fulfilled.match(response)) {
          setLoader(false);

          return navigate("/bet-success", {
            state: { betId: response?.payload?.data?.id, type: "accept" }
          });
        } else {
          var errMsg = response?.payload as string;

          setLoader(false);
          toast.error(errMsg, {
            position: "bottom-center",
          });
        }
      } else {
        const response = await dispatch(createBet(payload));
        if (createBet.fulfilled.match(response)) {
          setLoader(false);
          return navigate("/bet-success", {
            state: { betId: response?.payload?.data?.id, type: "created" }
          });
        } else {
          var errMsg = response?.payload as string;

          var err = Array.isArray(errMsg) ? errMsg[0] : errMsg
          setLoader(false);
          toast.error(err, {
            position: "bottom-center",
          });
        }
      }
    }
    else {
      var errMsg = verifyResponse?.payload as string
      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }



  };



  return (
    <div className="top-container" style={{ backgroundColor: 'transparent' }}>
      {
        !isMobile && <DesktopBackButton />
      }
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // flex: 1,
          // height: "100%",
          padding: "20px 10px 40px 10px", borderRadius: 10,
          backgroundColor: 'white'
        }}
      >
        <Header text="Wallet Pin" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px 0px 2rem 0px",
            }}
          >
            <p
              style={{
                ...FONTS.body6,
                margin: "0px 0px 15px 0px",
                textAlign: "center",
              }}
            >
              Enter your 6-Digit Transaction PIN to place this bet.
            </p>
            <div style={{ width: isMobile ? "90%" : "70%" }}>

              <OtpComponent otp={otp} setOtp={setOtp} />

              <p style={{ textAlign: 'center', marginTop: 30, cursor: 'pointer' }} onClick={() => navigate("/request-pin")}>Forgot Pin?</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <CustomeKeyboard value={otp} setValue={setOtp} />
            <div style={{ width: "100%", margin: "3rem 0px" }}>
              <Button
                text="Place Bet"
                propStyle={{ width: "100%" }}
                isLoading={loader}
                handlePress={() => handleSubmit()}
              />
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default WalletPin;
