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
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getUserData } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { formatCurrency } from "../../utils/helper";
import Loader from "../../components/Loader";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";

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
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
const dispatch = useAppDispatch()
const userFee = JSON.parse(localStorage.getItem("inviteeInfo"))

const isMobile = useMediaQuery({ maxWidth: 767 });

  const fetchUserInfo = async () => {
    setLoader(true);
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
      setLoader(false);
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);


  const goToPin = () => {
    if((userFee?.adjustedBetAmount) > userData?.walletBalance) {
      console.log("true")
      toast.error("Insufficient Balance", {
        position: "bottom-center",
      });
      return
    }
    if(userFee?.amount > userData?.walletBalance) {
      console.log("true")
      toast.error("Insufficient Balance", {
        position: "bottom-center",
      });
      return
    }
     navigate("/wallet-pin")
  }


  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "50vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="top-container" style={{backgroundColor: 'transparent'}}>
    {
      !isMobile && <DesktopBackButton />
    }
    <div style={{display: 'flex', flexDirection: 'column',padding: "20px 10px 40px 10px",borderRadius: 10,backgroundColor: 'white'}}>
      <Header text="Payment Option" />
      <p style={{ ...FONTS.body6, margin: "0rem 0px" }}>
        Select your preferred method for payment.
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
        <h3 style={{ ...FONTS.h6 }}>₦{userFee?.adjustedBetAmount ? formatCurrency(userFee?.adjustedBetAmount) : formatCurrency(userFee?.amount)}</h3>
      </div>

      <div style={{...styles.rowBtn,  cursor: "pointer"}} onClick={() => goToPin()}>
        <div style={{display: "flex", alignItems: "center"}} >
            <div>
            <TbCalculatorFilled color={COLORS.white} size={30} style={{backgroundColor: COLORS.primary, padding: 5, borderRadius: "100%", marginRight: 15}} />
            </div>
            <div>
                <h3 style={{...FONTS.body6}}>Wallet</h3>
                <p style={{...FONTS.body7}}>Balance: ₦{formatCurrency(userData?.walletBalance)}</p>
            </div>
        </div>
        <FaChevronRight />
      </div>

      <ToastContainer />
    </div>
    </div>
  );
}

export default Options;
