import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import CustomeKeyboard from "../../components/CustomKeyboard"
import Header from "../../components/Header"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import { TextAlign } from "../../utils/type"


const styles = {
    inputs: {
        width: "100%",
        padding: 30,
        border: "none",
        outline: "none",
        textAlign: "center" as TextAlign,
        fontSize: "40px",
        fontWight: "600",
        fontFamily: "Poppins"
    }
}

function Deposit() {
    const navigate = useNavigate()
    return (
        <div className="top-container">
            <Header
                text="Fund Wallet"
            />

            <p style={{ ...FONTS.body6, margin: "2rem 0px" }}>Please specify the amount you wish to top up into your wallet.</p>

            <div>
                <input style={{...styles.inputs}}  placeholder="0.00" />
            </div>

            <CustomeKeyboard />

            <div style={{ width: "100%", margin: "2rem 0px" }}>
                <Button
                    text="Next"
                    propStyle={{ width: "100%" }}
                handlePress={() => navigate("/payment-options")}
                />
            </div>

        </div>
    )
}

export default Deposit
