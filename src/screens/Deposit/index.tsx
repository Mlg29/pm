import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CustomeKeyboard from "../../components/CustomKeyboard";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { TextAlign } from "../../utils/type";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createTransaction } from "../../redux/slices/TransactionSlice";
import { ToastContainer, toast } from "react-toastify";
import { InputNumber } from "primereact/inputnumber";
import Loader from "../../components/Loader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { publicKey } from "../../https";
import { getUserData } from "../../redux/slices/AuthSlice";
import { IPInfoContext } from "ip-info-react";

const styles = {
  inputs: {
    width: "100%",
    // padding: 30,
    border: "none",
    outline: "none",
    textAlign: "center" as TextAlign,
    fontSize: "40px",
    fontWight: "600",
    fontFamily: "Poppins",
    color: "black",
    backgroundColor: "transparent",
  },
};

function Deposit() {
  const navigate = useNavigate();
  const [value, setValue] = useState<any>("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [loaderD, setLoaderD] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
    else {
      handleLogOut()
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setLoaderD(true);
    setTimeout(() => {
      setLoaderD(false);
    }, 1000);
  }, []);

  const currency = userData?.defaultCurrency === "NGN" ? "NGN" : "USD"
  const threePointFivePercentOfTheAmount = 0.035 * parseInt(value);

  const ninePercentOfThreePointFive = 0.09 * threePointFivePercentOfTheAmount;

  const chargeableAmount =
    currency === 'NGN'
      ? parseInt(value) +
      threePointFivePercentOfTheAmount +
      ninePercentOfThreePointFive +
      70
      : parseInt(value) +
      threePointFivePercentOfTheAmount +
      ninePercentOfThreePointFive;

  const config: any = {
    public_key: publicKey,
    tx_ref: Date.now(),
    amount: chargeableAmount,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userData?.email,
      phone_number: userData?.phoneNumber,
      name: `${userData?.firstName} ${userData?.lastName}`,
    },
    customizations: {
      title: "Fund wallet",
      description: "Fund wallet",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleNext = async () => {
    const payload = {
      amount: parseInt(value),
      type: "DEPOSIT",
      status: "SUCCESS"

    };

    setLoader(true);
    var response = await dispatch(createTransaction(payload));

    if (createTransaction.fulfilled.match(response)) {
      setLoader(false);
      //  console.log({response})
      // window.open(response?.payload?.data?.data?.paymentLink, '_blank');
      closePaymentModal();
      navigate("/deposit-success", {
        state: {
          message: "Deposit successfully completed",
          type: "Deposit"
        }
      });
      // toast.success(response?.payload?.data?.message, {
      //   position: "bottom-center",
      // });
    } else {
      var errMsg = response?.payload as string;

      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  const handleAmount = (val) => {
    // console.log({val})
    // setAmount(val)
  };

  if (loaderD) {
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
    <div className="top-container">
      <Header text="Fund Wallet" />

      <p style={{ ...FONTS.body6, margin: "1rem 0px" }}>
        Please specify the amount you wish to top up into your wallet.
      </p>

      <div>
        <input
          style={{ ...styles.inputs, display: "none" }}
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          placeholder="0.00"
          disabled
        />
        <InputNumber
          value={value}
          prefix={userData?.defaultCurrency === "NGN" ? "₦" : "$"}
          onValueChange={(e) => handleAmount(e.value)}
          minFractionDigits={2}
          disabled
          inputStyle={{ ...styles.inputs }}
          placeholder={userData?.defaultCurrency === "NGN" ? "₦0.00" : "$0.00"}
        />
      </div>

      <CustomeKeyboard value={value} setValue={setValue} />

      <div style={{ width: "100%", margin: "2rem 0px" }}>
        <Button
          text="Next"
          propStyle={{ width: "100%" }}
          isLoading={loader}
          // handlePress={() => navigate("/payment-options")}
          //handlePress={() => handleNext()}
          handlePress={() => {
            setLoader(true);
            return handleFlutterPayment({
              callback: (response) => {
                if (response?.status === "successful" || response?.status === "completed") {
                  handleNext();
                }
              },
              onClose: () => { },
            });
          }}
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Deposit;
