import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import { useAppDispatch } from "../../redux/hooks";
import { getSingleUser } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import NumberInput from "../../components/NumberInput";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";

const BetAmount = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const [allowCurrency, setAllowCurrency] = useState(false);

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

  return (
    <div className="top-container" style={{ backgroundColor: "transparent" }}>
      {!isMobile && <DesktopBackButton />}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Header text={"Bet Amount"} />

        <div style={{ display: "flex", flexDirection: "column", flex: 4 }}>
          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            required
            value={amount}
            setValue={(val) => setAmount(val)}
          />

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
