

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import TextInput from "../../components/TextInput";
import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import PhoneInputComponent from "../../components/PhoneInput";
import DatePickerComponent from "../../components/DatePickerComponent";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Button from "../../components/Button";
import { FlexDirection } from "../../utils/type";




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



function SignupScreen() {
  const [step, setStep] = useState(0)
  const [terms, setTerms] = useState(false)
  const navigate = useNavigate();



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
          <div style={{ ...styles.inactive }}></div>
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

  return (
    <div style={{ ...styles.container }}>
      <div style={{ marginTop: 10 }} onClick={() => navigate(-1)}>
        <MdArrowBackIos size={20} style={{ padding: "16px", background: COLORS.semiGray, borderRadius: 100 }} />
      </div>
      {stepLevel()}

      <div>
        <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Personal Information</h3>
        <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Let's get to know you better! Please fill in your personal details to complete your registration.</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          required
        />
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          required
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          required
          type="username"
        />
        <div style={{ width: "97%" }}>
          <PhoneInputComponent
            label="Phone Number"
            required
          />
        </div>
        <div style={{ width: "97%" }}>
          <DatePickerComponent
            label="Date of Birth"
            propStyle={{ width: "100%" }}
            required
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
          {
            terms ? <MdCheckBox size={20} onClick={() => setTerms(!terms)} />
              : <MdCheckBoxOutlineBlank onClick={() => setTerms(!terms)} size={20} />
          }
          <p style={{ ...FONTS.h6, margin: "0px 0px 0px 4px" }}>I agree to the Terms and Conditions.</p>
        </div>

        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              propStyle={{ width: "100%" }}
              handlePress={() => navigate('/verify')}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignupScreen
