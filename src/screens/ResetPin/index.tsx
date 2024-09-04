import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import { ToastContainer, toast } from "react-toastify";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useAppDispatch } from "../../redux/hooks";
import { requestNewPin, resetPin } from "../../redux/slices/TransactionSlice";
import { useNavigate } from "react-router-dom";

function ResetPin() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");
  const navigate = useNavigate()

  const handleRequestSubmit = async () => {
    if(!password){
      toast.error("Password is required", {
        position: "bottom-center",
      });
      return
    }
    setRequestLoader(true);
    const payload = {
      password,
    };
    const response = await dispatch(requestNewPin(payload));
    if (requestNewPin.fulfilled.match(response)) {
      setRequestLoader(false);
      setOtpStatus(true);
      setPassword("")
      toast.success(response?.payload?.data?.message, {
        position: "bottom-center",
      });
    } else {
      setRequestLoader(false);
      setOtpStatus(false);
      var errMsg = response?.payload as string;
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  const handleSubmit = async () => {
    if(!otp){
      toast.error("Otp is required", {
        position: "bottom-center",
      });
      return
    }
    if(!newPin){
      toast.error("New pin is required", {
        position: "bottom-center",
      });
      return
    }
    if(newPin?.length !== 6){
      toast.error("New pin must be 6 characters", {
        position: "bottom-center",
      });
      return
    }
    setLoader(true);
    const payload = {
      otp,
      pin: newPin
    };
    const response = await dispatch(resetPin(payload));
    if (resetPin.fulfilled.match(response)) {
       toast.success(response?.payload?.data?.message, {
        position: "bottom-center",
      });
      setLoader(false);
      setOtpStatus(false)
      setOtp("")
      setNewPin("")
      setTimeout(() => {
          navigate(-1)
      }, 1000)
     
     
    } else {
      setLoader(false);
      var errMsg = response?.payload as string;
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="top-container" style={{ backgroundColor: "transparent" }}>
      {!isMobile && <DesktopBackButton />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // flex: 1,
          // height: "100%",
          padding: "20px 10px 40px 10px",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Header text="Reset Pin" />
        {!otpStatus ? (
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
                Enter your password to reset your transaction pin.
              </p>
            </div>

            <div style={{ padding: isMobile ? "0px 0rem": "0px 3rem"}}>
              <TextInput
                label="Password"
                placeholder="Enter your password"
                required
                type="password"
                value={password}
                onChangeText={(e) => setPassword(e)}
                errorMsg={undefined}
              />

              <div style={{ width: "100%", marginTop: 50 }}>
                <Button
                  text="Request New Pin"
                  propStyle={{ width: "100%" }}
                  isLoading={requestLoader}
                  handlePress={() => handleRequestSubmit()}
                />
              </div>
            </div>
          </div>
        ) : (
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
                Enter the otp sent to your mail and your new pin.
              </p>
            </div>

            <div style={{ padding: isMobile ? "0px 0rem": "0px 3rem"}}>
              <TextInput
                label="OTP"
                placeholder="Enter your otp"
                required
                type="text"
                value={otp}
                onChangeText={(e) => setOtp(e)}
                errorMsg={undefined}
              />

              <TextInput
                label="New Pin"
                placeholder="Enter your pin"
                required
                isNumeric
                type="text"
                value={newPin}
                onChangeText={(e) => setNewPin(e)}
                errorMsg={undefined}
              />

              <div style={{ width: "100%", marginTop: 50 }}>
                <Button
                  text="Reset Pin"
                  propStyle={{ width: "100%" }}
                  isLoading={loader}
                  handlePress={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPin;
