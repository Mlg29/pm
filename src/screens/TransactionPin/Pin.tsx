import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";

import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";

import Button from "../../components/Button";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import { FlexDirection } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useAppDispatch } from "../../redux/hooks";
import { ToastContainer, toast } from 'react-toastify';
import { verifyEmailOtp } from "../../redux/slices/AuthSlice";





export const styles = {
  container: {
      padding: "0px 20px"
  },
  line: {
      display: "flex",
      flexDirection: "row" as FlexDirection,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "30px 20px 0px 20px"
  },
  active: {
      backgroundColor: COLORS.primary,
      width: 60,
      height: 5,
      borderRadius: 10
  },
  inactive: {
      backgroundColor: COLORS.semiGray,
      width: 60,
      height: 5,
      borderRadius: 10
  },
  bottom: {
      display: 'flex',
      flexDirection: "column" as FlexDirection,
      justifyContent: 'center',
      alignItems: "center",
      margin: "0px 0px 10px 0px"
  }
}

function Pin() {
  const [step, setStep] = useState(1)
  const [terms, setTerms] = useState(false)
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const getPendingData = JSON.parse(localStorage.getItem("pendingData"))
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)

  const stepLevel = () => {
    if (step === 0) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      )
    }
    else if (step === 1) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      )
    }
    else if (step === 2) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      )
    }
    else if (step === 3) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
          <div style={{ ...styles.inactive }}></div>
        </div>
      )
    }
    else if (step === 4) {
      return (
        <div style={{ ...styles.line }}>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.inactive }}></div>
          <div style={{ ...styles.active }}></div>
        </div>
      )
    }
    else {

    }
  }

  const MaskedEmail = ({ email }) => {
    const [username, domain] = email.split('@');
 
    const maskedUsername = `${username.slice(0, 3)}*******`;
  
    const maskedEmail = `${maskedUsername}@${domain}`;
  
    return <span>{maskedEmail}</span>;
  };

  const handleVerify = async () => {

    const payload = {
      email: getPendingData?.email,
      otp: parseInt(otp)
    }

    console.log({payload})
    setLoader(true)
    try {
      var response =  await dispatch(verifyEmailOtp(payload));
      if(verifyEmailOtp.fulfilled.match(response)){
       
        toast.success("Success", {
          position: "bottom-center"
        });
  
        setTimeout(() => { 
          setLoader(false)
          navigate('/create-password')
        }, 1000)
  
      }
      else {
        var errMsg = response?.payload as string;
        setLoader(false)
        toast.error(errMsg, {
          position: "bottom-center"
        });
      }
    }
    catch(err){
  
    }
  }

  return (
    <div style={{ ...styles.container }}>
      <div style={{ marginTop: 10 }}>
        <BackButton />
      </div>
      {stepLevel()}

      <div>
        <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Pin</h3>
        <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Enter your 6-digit PIN to complete your action <MaskedEmail email={getPendingData?.email} /> </p>
      </div>

      <div style={{ marginTop: 20 }}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <OtpComponent 
          otp={otp}
          setOtp={setOtp}
        />
        </div>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "20px 0px 40px 0px"}}>
            <p style={{...FONTS.body6}}>Didn’t get OTP?</p>
            <p style={{...FONTS.h6, margin: "0px 0px 0px 3px"}}>Resend in 1:36s</p>
        </div>

        <div style={{margin: "0px 0px 30px 0px"}}>
            <CustomeKeyboard 
             value={otp}
             setValue={setOtp}
            />
        </div>
       
        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Verify"
              propStyle={{ width: "100%" }}
              handlePress={() => handleVerify()}
              isLoading={loader}
            />
          </div>
        </div>

      </div>

      <ToastContainer />
    </div>
  )
}

export default Pin
