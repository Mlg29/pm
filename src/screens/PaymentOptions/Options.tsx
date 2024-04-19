import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import house from "../../assets/images/house.svg";
import card from "../../assets/images/card.svg";
import paypal from "../../assets/images/paypal.svg";
import arrowright from "../../assets/images/arrow-right.svg";
import { COLORS } from "../../utils/colors";
import { TbCalculatorFilled } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";


const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
  },
  rowBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

function Options() {
  const navigate = useNavigate();

  return (
    <div className="top-container">
      <Header text="Payment Option" />
      <p style={{ ...FONTS.body6, margin: "0rem 0px" }}>
        Select your preferred method to top up your wallet.
      </p>

      <div
        style={{
          backgroundColor: COLORS.cream,
          padding: "15px 20px",
          margin: "1rem 0px 2rem 0px",
          borderRadius: 20,
        }}
      >
        <p style={{ ...FONTS.body7, color: COLORS.gray, marginBottom: "10px" }}>
          Debit amount for this game
        </p>
        <h3 style={{ ...FONTS.h6 }}>₦10,000.00</h3>
      </div>

      <div style={{...styles.rowBtn}}>
        <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => navigate("/wallet-pin")}>
            <div>
            <TbCalculatorFilled color={COLORS.white} size={30} style={{backgroundColor: COLORS.primary, padding: 5, borderRadius: "100%", marginRight: 15}} />
            </div>
            <div>
                <h3 style={{...FONTS.body6}}>Wallet</h3>
                <p style={{...FONTS.body7}}>Balance: ₦18,720.92</p>
            </div>
        </div>
        <FaChevronRight />
      </div>
    </div>
  );
}

export default Options;
