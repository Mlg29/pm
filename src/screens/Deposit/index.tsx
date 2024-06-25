import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CustomeKeyboard from "../../components/CustomKeyboard";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { TextAlign } from "../../utils/type";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createTransaction } from "../../redux/slices/TransactionSlice";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  inputs: {
    width: "100%",
    padding: 30,
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
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const handleNext = async () => {
    const payload = {
      amount: parseFloat(value),
      type: "DEPOSIT",
      status: "SUCCESS",
    };
    setLoader(true);
    var response = await dispatch(createTransaction(payload));
    if (createTransaction.fulfilled.match(response)) {
      setLoader(true);
      navigate("/deposit-success");
      toast.success(response?.payload?.data?.message, {
        position: "bottom-center",
      });
    } else {
      var errMsg = response?.payload as string;
      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="top-container">
      <Header text="Fund Wallet" />

      <p style={{ ...FONTS.body6, margin: "1rem 0px" }}>
        Please specify the amount you wish to top up into your wallet.
      </p>

      <div>
        <input
          style={{ ...styles.inputs }}
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          placeholder="0.00"
        />
      </div>

      <CustomeKeyboard value={value} setValue={setValue} />

      <div style={{ width: "100%", margin: "2rem 0px" }}>
        <Button
          text="Next"
          propStyle={{ width: "100%" }}
          isLoading={loader}
          // handlePress={() => navigate("/payment-options")}
          handlePress={() => handleNext()}
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Deposit;
