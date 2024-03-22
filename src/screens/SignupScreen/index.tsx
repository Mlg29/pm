import { useNavigate } from "react-router-dom";
import { styles } from "./style";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import TextInput from "../../components/TextInput";




function SignupScreen() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate();

  const handleNext = () => {
    if(step === 4){
      setStep(0)
      return;
    }
    setStep(step + 1)
  }


  const stepLevel = () => {
    if(step === 0) {
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.active}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
      </div>
      )
    }
    else if(step === 1){
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.active}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
      </div>
      )
    }
    else if (step === 2){
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.active}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
      </div>
      )
    }
    else if (step === 3){
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.active}}></div>
        <div style={{...styles.inactive}}></div>
      </div>
      )
    }
    else if (step === 4){
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.active}}></div>
      </div>
      )
    }
    else {

    }
  }
  
  return (
    <div style={{...styles.container}}>
           {stepLevel()}

           <div>
            <h3 style={{...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px"}}>Personal Information</h3>
            <p style={{...FONTS.body5,textAlign: 'center', fontWeight: '400'}}>Let's get to know you better! Please fill in your personal details to complete your registration.</p>
           </div>

           <div style={{marginTop: 20}}> 
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
           </div>
    </div>
  )
}

export default SignupScreen
