import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSingleUser, userState } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import NumberInput from "../../components/NumberInput";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { IPInfoContext } from "ip-info-react";
import { getFxRate } from "../../redux/slices/MiscSlice";
import { MdPrivacyTip } from "react-icons/md";




const BetAmount = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const userIp = useContext(IPInfoContext);
  const [allowCurrency, setAllowCurrency] = useState(false);
  const [exRate, setExRate] = useState(null)
  const userData = useAppSelector(userState)


  const checkHandler = () => {
    setAllowCurrency(!allowCurrency);
  };

  const handleRoute = async () => {
    if (!amount) {
      toast.error("Amount is required", {
        position: "bottom-center",
      });
      return;
    }
    const payload = {
      invitedUser: null,
      amount: amount,
      allowOtherCurrency: allowCurrency,
    };
    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  };

  const handleFxRate = async (amount) => {
    const rateData = {
      sourceCurrency: userIp?.currency === "USD" ? "USD" : "NGN",
      destinationCurrency: userIp?.currency === "USD" ? "NGN" : "USD",
      amount: amount
    }

    await  dispatch(getFxRate(rateData)).then(pp => {
      setExRate(pp?.payload?.data)
    })
  }

  console.log({exRate})

  return (
    <div className="top-container" style={{ backgroundColor: "transparent" }}>
      {!isMobile && <DesktopBackButton />}
      <div style={{ display: "flex", flexDirection: "column", padding: "20px 10px 40px 10px",borderRadius: 10, backgroundColor: 'white' }}>
        <Header text={"Bet Amount"} />

        <div style={{ display: "flex", flexDirection: "column", }}>
          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            required
            value={amount}
            setValue={(val) => {
              setAmount(val)
              handleFxRate(val)
            }}
            prefix={userIp?.currency === "NGN" ? "₦" : "$"}
          />
         {
          exRate ?  <div>
          <p style={{textAlign: 'right', margin: "10px 0px"}}>{userIp?.currency === "NGN" ? "$" : "₦"}{exRate?.rate * parseInt(amount)}</p>
        </div>
        : null
         }

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <div style={{ width: "30px" }}>
                <input
                  type="checkbox"
                  onChange={checkHandler}
                  checked={allowCurrency}
                />
              </div>
              <p>Allow Other Currency</p>
            </div>
          </div>

         {
          exRate ?
          <div style={{backgroundColor: '#f9f2f1', padding: 20, borderRadius: 10, marginBottom: 30}}>
          <p style={{fontSize: 12, marginBottom: 10}}>Current Rate</p>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <p style={{fontSize: 14}}>{exRate?.rate}</p>

            </div>

            <div>
            <p style={{fontSize: 14}}>{userIp?.currency === "NGN" ? "₦":"$"}{amount} = {userIp?.currency === "NGN" ? "$" : "₦"}{exRate?.rate * parseInt(amount)}</p>
            </div>
          </div>
        </div>
        : null
         }
        </div>

        {/* <div style={{backgroundColor: '#f9f2f1', padding: 20, borderRadius: 10, marginTop: 50, marginBottom: 30}}>
            <p style={{fontSize: 12, marginBottom: 10}}>Payout will be based on the FX rate at the time of game result.</p>
           
          </div> */}
              <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "15px",
          alignItems: 'center',
          backgroundColor: COLORS.cream,
          marginBottom: 20,
          marginTop: 50,
    
        }}
      >
        <MdPrivacyTip size={30} style={{ paddingRight: "5px" }} />
        <p style={{ ...FONTS.body7 }}>
        Payout will be based on the FX rate at the time of game result.
        </p>
      </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Button
            text="Place Bet"
            propStyle={{ width: "100%" }}
            isLoading={loader}
            handlePress={() => handleRoute()}
          />
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default BetAmount;
