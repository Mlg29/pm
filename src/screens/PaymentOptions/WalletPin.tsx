import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import { FONTS } from "../../utils/fonts";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { acceptBet, adjustBet, createBet } from "../../redux/slices/BetSlice";

function WalletPin() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const userFee = JSON.parse(localStorage.getItem("inviteeInfo"));
  const getUserBet = JSON.parse(localStorage.getItem("userBetSelection"));

  console.log({ userFee });

  const handleSubmit = async () => {
    if (otp?.length < 6) {
      toast.error("Transaction Pin is required", {
        position: "bottom-center",
      });
      return;
    }
    const payload = {
      opponentId: userFee?.invitedUser ? userFee?.invitedUser : null,
      sportEventId: getUserBet?.sportEventId,
      betAmount: parseInt(userFee?.amount),
      betCurrency: "NGN",
      prediction: getUserBet?.userType,
      betType: userFee?.invitedUser ? "PRIVATE" : "OPEN",
    };

    const adjustPayload = {
      id: userFee?.betId,
      opponentId: userFee?.invitedUser ? userFee?.invitedUser : null,
      sportEventId: getUserBet?.sportEventId,
      betAmount: parseInt(userFee?.adjustedBetAmount),
      betCurrency: "NGN",
      prediction: getUserBet?.userType,
      betType: userFee?.invitedUser ? "PRIVATE" : "OPEN",
    }
    const acceptPayload = {
      id: userFee?.betId
    }

    setLoader(true);
    if (userFee?.isAdjustBet) {
      const response = await dispatch(adjustBet(adjustPayload))
      if (adjustBet.fulfilled.match(response)) {
        setLoader(false);
        return navigate("/bet-success");
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        toast.error(errMsg, {
          position: "bottom-center",
        });
      }
    }
    else if (userFee?.isAcceptBet) {
      const response = await dispatch(acceptBet(acceptPayload))
      if (acceptBet.fulfilled.match(response)) {
        setLoader(false);
        return navigate("/bet-success");
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
        return navigate("/bet-success");
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        toast.error(errMsg, {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div
      className="top-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Header text="Wallet Pin" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
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
          <OtpComponent otp={otp} setOtp={setOtp} />
        </div>
      </div>

      <div style={{ display: "flex", flex: 3 }}>
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
  );
}

export default WalletPin;
