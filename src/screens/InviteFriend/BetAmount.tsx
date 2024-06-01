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

const BetAmount = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);




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
    };
    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  };



  return (
    <div className="top-container">
      <Header text={"Bet Amount"} />

      <div style={{ display: "flex", flexDirection: "column", flex: 4 }}>
        <TextInput
          label="Amount"
          placeholder="Enter Amount"
          required
          value={amount}
          onChangeText={(val: string) => {
            setAmount(val);
          }}
        />
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
  );
};

export default BetAmount;
