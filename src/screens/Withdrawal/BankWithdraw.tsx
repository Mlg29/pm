import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import DatePickerComponent from "../../components/DatePickerComponent";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBankList } from "../../redux/slices/MiscSlice";
import { getUserPayout, userState } from "../../redux/slices/AuthSlice";
import { InputNumber } from "primereact/inputnumber";
import { TextAlign } from "../../utils/type";
import { IPInfoContext } from "ip-info-react";
import CustomeKeyboard from "../../components/CustomKeyboard";
import { withdrawal } from "../../redux/slices/TransactionSlice";
import { toast, ToastContainer } from "react-toastify";

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

function BankWithdraw() {
  const navigate = useNavigate();
  const [value, setValue] = useState<any>("");
  const dispatch = useAppDispatch();
  const [accountDetail, setAccountDetail] = useState(null);
  const userIp = useContext(IPInfoContext);
  const [loader, setLoader] = useState(false);
  const userData = useAppSelector(userState)

  const getUserAccountDetail = () => {
    dispatch(getUserPayout()).then((pp) => {
      setAccountDetail(pp?.payload?.data);
    });
  };

  useEffect(() => {
    getUserAccountDetail();
  }, []);

  const handleAmount = (val) => {
    // console.log({val})
    // setAmount(val)
  };

  const handleWithdraw = async () => {
    const payload = {
      amount: parseFloat(value),
      payoutAccountId: accountDetail?.id
    };

    setLoader(true);
    var response = await dispatch(withdrawal(payload));
    if (withdrawal.fulfilled.match(response)) {
      setLoader(false);

      navigate("/deposit-success", {
        state: {
            message: response?.payload?.data?.message,
            type: "Withdrawal"
        }
      });
    //   toast.success(response?.payload?.data?.message, {
    //     position: "bottom-center",
    //   });
    } else {
      var errMsg = response?.payload as string;

      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      className="top-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Header text="Withdraw" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <input
            style={{ ...styles.inputs, display: "none" }}
            value={value}
            onChange={(e) => setValue(e?.target?.value)}
            placeholder="0.00"
          />
          <InputNumber
            value={value}
            prefix={userData?.defaultCurrency === "NGN" ? "₦" : "$"}
            onValueChange={(e) => handleAmount(e.value)}
            minFractionDigits={2}
            inputStyle={{ ...styles.inputs }}
            placeholder={userData?.defaultCurrency === "NGN" ? "₦0.00" : "$0.00"}
          />
        </div>

        <CustomeKeyboard value={value} setValue={setValue} />
      </div>

      <div style={{ display: "flex", marginTop: 30 }}>
        <div style={{ width: "100%" }}>
          <Button
            text="Withdraw"
            isLoading={loader}
            propStyle={{ width: "100%" }}
            handlePress={() => handleWithdraw()}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default BankWithdraw;
