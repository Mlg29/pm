import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import OtpComponent from "../../components/OtpComponent"
import CustomeKeyboard from "../../components/CustomKeyboard"
import { FONTS } from "../../utils/fonts"



function WalletPin() {
  const navigate = useNavigate()

  return (
    <div className="top-container" style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
      <Header
        text="Wallet Pin"
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, }}>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "0px 0px 2rem 0px" }}>
          <p style={{ ...FONTS.body6, margin: "0px 0px 15px 0px", textAlign: "center" }}>Enter your 6-Digit Transaction PIN to place this bet.</p>
          <OtpComponent />
        </div>
      </div>

      <div style={{ display: "flex", flex: 3, }}>
        <div style={{ width: "100%" }}>
          <CustomeKeyboard
            isFaceId

          />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0px" }}>
            <p style={{ ...FONTS.body6 }}>Forget PIN? </p>
            <p style={{ ...FONTS.h6, margin: "0px 3px" }} onClick={() => navigate('/sign-up')}> Reset PIN</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletPin
