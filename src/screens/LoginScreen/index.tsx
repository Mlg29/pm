import { useNavigate } from "react-router-dom";
import { styles } from "./style";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import miniLogo from "../../assets/images/miniLogo.svg"
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";





function LoginScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")




  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <img src={miniLogo} width={100} />
          <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}> Log In</h3>
          <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Enter your Log In credentials to gain access to your account.</p>
        </div>

        <div style={{ marginTop: 20 }}>

          <TextInput
            label="Phone Number/Email Address"
            placeholder="Enter your Phone Number/Email Addressd"
            required
            value={phone}
            handleChange={(val: string) => {
              setPhone(val)
            }}
          />



          <TextInput
            label="Password"
            placeholder="Enter your password"
            required
            type="password"
            value={password}
            handleChange={(val: string) => {
              setPassword(val)
            }}
          />

          <div style={{ margin: "20px 0px" }}>
            <p style={{ ...FONTS.body7, fontWeight: 'bold', color: `${COLORS.primary}`, textAlign: 'right' }} onClick={() => navigate("/forget-password")}>Forget Password?</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Log In"
              propStyle={{ width: "100%" }}
              handlePress={() => navigate('/home')}
            />
          </div>

          <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0px"}}>
          <p style={{ ...FONTS.body6 }}>Don’t have an account? </p>
            <p style={{ ...FONTS.h6, margin: "0px 3px" }} onClick={() => navigate('/sign-up')}> Create Account</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default LoginScreen
