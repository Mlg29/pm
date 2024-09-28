import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import house from "../../assets/images/house.svg";
import card from "../../assets/images/card.svg";
import paypal from "../../assets/images/paypal.svg";
import arrowright from "../../assets/images/arrow-right.svg";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
  },
};

function Withdrawal() {
  const navigate = useNavigate();

  const config: any = {
    public_key: "FLWPUBK_TEST-e7c8f332b9d34b01b958cf4f4f643018-X",
    tx_ref: Date.now(),
    amount: 10000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: 'test@gmail.com',
      phone_number: '08123456789',
      name: "John Doe",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const dataList = [
    {
      id: 1,
      name: "Bank Transfer",
      text: "Make a transfer directly from your wallet.",
      image: house,
      handleRoute: () => navigate("/bank-withdraw"),
    },
    {
      id: 3,
      name: "Paypal",
      text: "Add funds instantly using your bank card.",
      image: paypal,
      handleRoute: () => navigate("/fund-wallet"),
    },
  ];
  return (
    <div className="top-container">
      <Header text="Withdrawal Option" />
      <p style={{ ...FONTS.body6, margin: "2rem 0px 1rem 0px" }}>
        Select your preferred method to withdraw.
      </p>

      <div>
        {dataList?.map((data: any) => {
          return (
            <div
              key={data?.id}
              style={{ ...styles.row }}
              onClick={data?.handleRoute}
            >
              <img src={data?.image} />
              <div style={{ margin: "0px 10px", width: "100%" }}>
                <h3 style={{ ...FONTS.h6, margin: "0px" }}>{data?.name}</h3>
                <p style={{ ...FONTS.body7, margin: "5px 0px" }}>
                  {data?.text}
                </p>
              </div>
              <img src={arrowright} />
            </div>
          );
        })}
        {/* <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Pay
        </button> */}
      </div>
    </div>
  );
}

export default Withdrawal;








// import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
// import CustomeKeyboard from "../../components/CustomKeyboard";
// import Header from "../../components/Header";
// import { COLORS } from "../../utils/colors";
// import { FONTS } from "../../utils/fonts";
// import { TextAlign } from "../../utils/type";
// import { useContext, useEffect, useState } from "react";
// import { useAppDispatch } from "../../redux/hooks";
// import { createTransaction, withdrawal } from "../../redux/slices/TransactionSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { InputNumber } from "primereact/inputnumber";
// import Loader from "../../components/Loader";

// import { getUserData } from "../../redux/slices/AuthSlice";
// import { IPInfoContext } from "ip-info-react";

// const styles = {
//   inputs: {
//     width: "100%",
//     // padding: 30,
//     border: "none",
//     outline: "none",
//     textAlign: "center" as TextAlign,
//     fontSize: "40px",
//     fontWight: "600",
//     fontFamily: "Poppins",
//     color: "black",
//     backgroundColor: "transparent",
//   },
// };

// function Withdrawal() {
//   const navigate = useNavigate();
//   const [value, setValue] = useState<any>("");
//   const dispatch = useAppDispatch();
//   const [loader, setLoader] = useState(false);
//   const [loaderD, setLoaderD] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const userIp = useContext(IPInfoContext);

  
//   const fetchUserInfo = async () => {
//     const response = await dispatch(getUserData());
//     if (getUserData.fulfilled.match(response)) {
//       setUserData(response?.payload);
//     }
//   };


//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   useEffect(() => {
//     setLoaderD(true);
//     setTimeout(() => {
//       setLoaderD(false);
//     }, 1000);
//   }, []);



//   const handleNext = async () => {
//     const payload = {
//       amount: parseFloat(value),
//     };
//     setLoader(true);
//     var response = await dispatch(withdrawal(payload));

//     if (withdrawal.fulfilled.match(response)) {
//       setLoader(false);
//       navigate("/deposit-success");
//       toast.success(response?.payload?.data?.message, {
//         position: "bottom-center",
//       });
//     } else {
//       var errMsg = response?.payload as string;

//       setLoader(false);
//       toast.error(errMsg, {
//         position: "bottom-center",
//       });
//     }
//   };

//   const handleAmount = (val) => {
//     // console.log({val})
//     // setAmount(val)
//   };

//   if (loaderD) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           flex: 1,
//           height: "50vh",
//         }}
//       >
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="top-container">
//       <Header text="Withdraw fund" />

//       <p style={{ ...FONTS.body6, margin: "1rem 0px" }}>
//         Please specify the amount you wish to withdraw from your wallet.
//       </p>

//       <div>
//         <input
//           style={{ ...styles.inputs, display: "none" }}
//           value={value}
//           onChange={(e) => setValue(e?.target?.value)}
//           placeholder="0.00"
//         />
//         <InputNumber
//           value={value}
//          prefix={userIp?.currency === "NGN" ? "₦" : "$"}
//           onValueChange={(e) => handleAmount(e.value)}
//           minFractionDigits={2}
//           inputStyle={{ ...styles.inputs }}
//           placeholder={userIp?.currency === "NGN" ? "₦0.00" : "$0.00"}
//         />
//       </div>

//       <CustomeKeyboard value={value} setValue={setValue} />

//       <div style={{ width: "100%", margin: "2rem 0px" }}>
//         <Button
//           text="Withdraw"
//           propStyle={{ width: "100%" }}
//           isLoading={loader}
//           // handlePress={() => navigate("/payment-options")}
//           // handlePress={() => handleNext()}
//           handlePress={() => {
         
//             return handleNext()
//           }}
//         />
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Withdrawal;

