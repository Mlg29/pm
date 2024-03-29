import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";
import miniLogo from "../../assets/images/miniLogo.svg"
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { MdArrowBackIos } from "react-icons/md";
import { FlexDirection } from "../../utils/type";





export const styles = {
  container: {
      display: "flex",
      flexDirection: "column" as FlexDirection,
      padding: "0px 20px",
      flex: 1,
      height: "100%"
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



function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")





  return (
    <div style={{ ...styles.container }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
      <div style={{ marginTop: 10 }} onClick={() => navigate(-1)}>
        <MdArrowBackIos size={20} style={{ padding: "16px", background: COLORS.semiGray, borderRadius: 100 }} />
      </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <img src={miniLogo} width={100} />
          <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}> Forget Password</h3>
          <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Enter your Log In credentials to gain access to your account.</p>
        </div>

        <div style={{ marginTop: 20 }}>

          <TextInput
            label="Phone Number/Email Address"
            placeholder="Enter your Phone Number/Email Address"
            required
            value={email}
            handleChange={(val: string) => {
              setEmail(val)
            }}
          />

        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div style={{ ...styles.bottom }}>
          <div style={{ width: "100%" }}>
            <Button
              text="Continue"
              propStyle={{ width: "100%" }}
              handlePress={() => navigate('/pin')}
            />
          </div>
        </div>
      </div>


    </div>
  )
}

export default ForgetPassword
