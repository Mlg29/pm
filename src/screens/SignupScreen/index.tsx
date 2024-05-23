

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
import { CreateAccountFormDataUi, FlexDirection } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useAppDispatch } from "../../redux/hooks";
import { createUser, verifySignupData } from "../../redux/slices/AuthSlice";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useFormik} from 'formik';
import { CreateAccountSchema } from "../../https/schemas";
import { ToastContainer, toast } from 'react-toastify';


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
  const dispatch = useAppDispatch()
  const [dob, setDob] = useState(new Date());
  const [loader, setLoader] = useState(false)


  const initialValues: CreateAccountFormDataUi = {
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };


  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
  useFormik({
    initialValues,
    validationSchema: CreateAccountSchema,
    onSubmit: (data: CreateAccountFormDataUi) => handleSubmitData(data),
    enableReinitialize: true,
  });


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


 

  const handleSubmitData = async (data) => {
    
    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      userName: data?.userName,
      dob: dob?.toISOString().slice(0, 10),
    }
    const verifyPayload = {
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      userName: data?.userName,
    }

    setLoader(true)
  try {
    var response =  await dispatch(verifySignupData(verifyPayload));
    if(verifySignupData.fulfilled.match(response)){
     
      localStorage.setItem("pendingData", JSON.stringify(payload))
      toast.success(response?.payload?.data?.message, {
        position: "bottom-center"
      });

      setTimeout(() => { 
        setLoader(false)
        navigate('/verify')
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
        <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Personal Information</h3>
        <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Let's get to know you better! Please fill in your personal details to complete your registration.</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          required
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          errorMsg={touched.firstName ? errors.firstName : undefined}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          required
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          errorMsg={touched.lastName ? errors.lastName : undefined}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          required
          value={values.email}
          onChangeText={handleChange('email')}
          errorMsg={touched.email ? errors.email : undefined}
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          required
          type="username"
          value={values.userName}
          onChangeText={handleChange('userName')}
          errorMsg={touched.userName ? errors.userName : undefined}
        />
        <div style={{ width: "100%" }}>
          <PhoneInputComponent
            label="Phone Number"
            required
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined}
          />
        </div>
        <div style={{ width: "100%" }}>
          <DatePickerComponent
            label="Date of Birth"
            propStyle={{ width: "100%" }}
            required
             value={dob}
             onChangeDate={(date) => setDob(date)}
           
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
          {
            terms ? <MdCheckBox size={20} onClick={() => setTerms(!terms)} style={{cursor: "pointer"}} />
              : <MdCheckBoxOutlineBlank onClick={() => setTerms(!terms)} size={20} style={{cursor: "pointer"}} />
          }
          <p style={{ ...FONTS.h6, margin: "0px 0px 0px 4px", cursor: "pointer"}} onClick={() => navigate("/terms-and-conditions")}>I agree to the Terms and Conditions.</p>
        </div>

        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              propStyle={{ width: "100%" }}
              isLoading={loader}
            // handlePress={() => navigate('/verify')}
              handlePress={() => handleSubmit()}
            />
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default SignupScreen
