import { useNavigate } from "react-router-dom";
import { styles } from "./style";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";

import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";
import success from "../../assets/images/success.svg"

function AuthSuccess() {
    const [step, setStep] = useState(4)
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("")




    return (
        <div style={{ ...styles.container }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>


                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>

                    <img src={success} />

                    <div>
                        <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Wow! You Did It.</h3>
                        <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Success! Your have successfully created your account.</p>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                <div style={{ ...styles.bottom }}>
                    <div style={{ width: "100%" }}>
                        <Button
                            text="Continue"
                            propStyle={{ width: "100%" }}
                            handlePress={() => navigate('/login')}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthSuccess
