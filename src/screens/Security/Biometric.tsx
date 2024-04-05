import Button from "../../components/Button"
import Header from "../../components/Header"
import { FONTS } from "../../utils/fonts"
import biometrics from "../../assets/images/biometrics.svg"



function Biometric() {
  return (
    <div className="top-container">
      <Header 
        text="Biometrics"
      />

      <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", flex: 5}}>
        <img src={biometrics} />
        <h3 style={{...FONTS.h5, textAlign: 'center', marginTop: '3rem'}}>Activate Biometrics</h3>
        <p style={{...FONTS.body6, textAlign: 'center'}}>Enable facial recognition for seamless authorization without the need to input your PIN every time. Your biometrics will be your key to swift and secure actions.</p>
      </div>

      <div style={{display: "flex", flexDirection: "column", flex: 1}}>
            <Button 
                text="Activate now"
            />
            <h3 style={{...FONTS.h5, textAlign: 'center', margin: "1rem 0px"}}>I will do this later</h3>
      </div>
    </div>
  )
}

export default Biometric
