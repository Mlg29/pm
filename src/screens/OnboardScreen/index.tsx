import { useState } from "react"
import { styles } from "./style"
import { FONTS } from "../../utils/fonts"
import quick from "../../assets/images/quick.svg"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"




function OnboardScreen() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate();

  const handleNext = () => {
    if(step === 2){
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
      </div>
      )
    }
    else if(step === 1){
      return (
        <div style={{...styles.line}}>
        <div style={{...styles.inactive}}></div>
        <div style={{...styles.active}}></div>
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
      </div>
      )
    }
    else {

    }
  }

  return (
    <div style={{...styles.container}}>
      {stepLevel()}
      {/* <div onClick={handleNext} style={{display: "flex", justifyContent: "flex-end", padding: "0px 20px"}}>
        <h3>Next</h3>
      </div> */}
      <div style={{padding: "2rem 20px"}}>
        <h3 style={{...FONTS.h2, fontWeight: 'bold'}}>Quickly receive payment after winning</h3>
      </div>

    <div style={{...styles.bg}}>
      <img src={quick} />
    </div>

    <div style={{...styles.bottom}}>
      <div style={{width: "90%"}}>
      <Button 
        text="Create an Account"
        propStyle={{width: "100%"}}
        handlePress={() =>  navigate('/sign-up')}
      />
      <p style={{...FONTS.h6, textAlign: 'center', marginTop: "20px"}} onClick={() =>  navigate('/login')}>I already have an account?</p>
      </div>
    </div>

    </div>
  )
}

export default OnboardScreen
