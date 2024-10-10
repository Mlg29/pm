

import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import {
  getUserPayout,
  userState,
} from "../../redux/slices/AuthSlice";
import Loader from "../../components/Loader";
import { COLORS } from "../../utils/colors";
import { FiEdit } from "react-icons/fi";
import { withdrawal } from "../../redux/slices/TransactionSlice";
import emptyState from "../../assets/images/illustration.svg"

function BankWithdraw() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [accountDetail, setAccountDetail] = useState(null);
  const [value, setValue] = useState<any>("");
  const userData = useAppSelector(userState);

  const getUserAccountDetail = () => {
    setLoad(true);
    dispatch(getUserPayout()).then((pp) => {
      setAccountDetail(pp?.payload?.data);
      setLoad(false);
    });
  };


  useEffect(() => {
    getUserAccountDetail();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      amount: parseFloat(value),
      payoutAccountId: accountDetail?.id,
    };

    setLoader(true);
    var response = await dispatch(withdrawal(payload));
    if (withdrawal.fulfilled.match(response)) {
      setLoader(false);
      navigate("/deposit-success", {
        state: {
          message: response?.payload?.data?.message,
          type: "Withdrawal",
        },
      });

    } else {
      var errMsg = response?.payload as string;

      setLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  if (load) {
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
        {" "}
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="top-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ToastContainer />
      <Header text="Bank Withdraw" />
      {accountDetail ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: "#f9f2f1",
              width: "100%",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 5,
                borderBottom: "1px solid #e6e6e6",
              }}
            >
              <p
                style={{
                  color: COLORS.primary,
                  fontSize: 12,
                  marginBottom: 10,
                }}
              >
                Account Number
              </p>
              <p style={{ color: COLORS.primary }}>
                {accountDetail?.accountNumber}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 5,
                borderBottom: "1px solid #e6e6e6",
                marginTop: 20,
              }}
            >
              <p
                style={{
                  color: COLORS.primary,
                  fontSize: 12,
                  marginBottom: 10,
                }}
              >
                Account Name:
              </p>
              <p style={{ color: COLORS.primary }}>
                {accountDetail?.accountName}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 5,
                marginTop: 20,
              }}
            >
              <p
                style={{
                  color: COLORS.primary,
                  fontSize: 12,
                  marginBottom: 10,
                }}
              >
                Bank Name:
              </p>
              <p style={{ color: COLORS.primary }}>{accountDetail?.bankName}</p>
            </div>
          </div>
          <div style={{ marginTop: 10 }} />
          <TextInput
            label="Amount"
            placeholder={`${
              userData?.defaultCurrency === "NGN" ? "₦0.00" : "$0.00"
            }`}
            required
            value={value}
            onChangeText={(val) => setValue(val)}
          />

          <div style={{ display: "flex", marginTop: 30 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                isLoading={loader}
                propStyle={{
                  width: "100%",
                  backgroundColor: "",
                }}
                handlePress={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{display: 'flex', height: 400,justifyContent: 'center', alignItems: 'center',}}>
          <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
          <img src={emptyState} width={200} />
          <h3 style={{textAlign: 'center', fontSize: 14, width: 250}}>You dont have a payout account yet. Kindly create one to enable withdrawal</h3>
         
          <div style={{ width: "100%", marginTop: 30 }}>
              <Button
                text="Create a Payout Account"
                isLoading={loader}
                propStyle={{
                  width: "100%",
                  backgroundColor: "",
                }}
                handlePress={() => navigate("/payout")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankWithdraw;
