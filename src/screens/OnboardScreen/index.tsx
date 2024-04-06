import { useState } from "react"
import { FONTS } from "../../utils/fonts"
import quick from "../../assets/images/quick.svg"
import high from "../../assets/images/high.svg"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { FlexDirection, ObjectFit } from "../../utils/type"
import { COLORS } from "../../utils/colors"





export const styles =  {
  container: {
    
  },
  row: {
      display: "flex",
      flexDirection: "row" as FlexDirection,
      alignItems: "center"
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
      width: 110,
      height: 5,
      borderRadius: 10
  },
  inactive: {
      backgroundColor: COLORS.semiGray,
      width: 110,
      height: 5,
      borderRadius: 10
  },
  bg: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      objectFit: "contain" as ObjectFit,
      width: "100%"
  },
  bottom: {
      paddingTop: '5rem',
      display: 'flex',
      flexDirection: "column" as FlexDirection,
      justifyContent: 'center',
      alignItems: "center"
  }
}




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
      <img src={high} style={{width: '90%'}} />
    </div>

    <div style={{...styles.bottom}}>
      <div style={{width: "90%"}}>
      <Button 
        text="Create an Account"
        propStyle={{width: "100%"}}
        handlePress={() =>  navigate('/sign-up')}
      />
      <p style={{...FONTS.h6, textAlign: 'center', marginTop: "20px", cursor: "pointer"}} onClick={() =>  navigate('/login')}>I already have an account?</p>
      </div>
    </div>

    </div>
  )
}

export default OnboardScreen
