import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import {
  AccountPayout,
  getUserData,
  getUserPayout,
  userState,
} from "../../redux/slices/AuthSlice";
import Loader from "../../components/Loader";
import { COLORS } from "../../utils/colors";
import { FiEdit } from "react-icons/fi";
import { withdrawal } from "../../redux/slices/TransactionSlice";
import emptyState from "../../assets/images/illustration.svg";
import { getBankList, verifyBank } from "../../redux/slices/MiscSlice";
import Dropdown from "../../components/Dropdown";
import CurrencyInput from "../../components/TextInput/CurrencyInput";

function BankWithdraw() {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [bankId, setBankId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const dispatch = useAppDispatch();
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountDetail, setAccountDetail] = useState(null);
  const userData = useAppSelector(userState);
  const [value, setValue] = useState("");

  const getUserAccountDetail = async () => {
    setLoad(true);
    await dispatch(getUserPayout()).then((pp) => {
      setAccountDetail(pp?.payload?.data);
      setLoad(false);
    });
  };

  const bankList = banks?.map((dd) => {
    return {
      id: dd?.code,
      value: dd?.name,
    };
  });

  const selectedBank = bankList?.find((aa) => aa?.value === bankId);

  const getAccountDetail = async (num) => {
    setVerifyLoader(true);
    const payload = {
      accountNumber: num,
      bankCode: selectedBank?.id?.toString(),
    };

    var response = await dispatch(verifyBank(payload));
    if (verifyBank.fulfilled.match(response)) {
      setVerifyLoader(false);
      setAccountName(response?.payload?.data?.data?.account_name);
    } else {
      var errMsg = response?.payload as string;

      setVerifyLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  const getBanks = () => {
    dispatch(getBankList()).then((pp) => {
      setBanks(pp?.payload?.data);
    });
  };

  useEffect(() => {
    getBanks();
    getUserAccountDetail();
    dispatch(getUserData())
  }, []);



  const handleWithdrawal = async () => {
    const bb = value.replace(/,/g, "");

    if (userData?.walletBalance < parseFloat(bb)) {
      toast.error("Insufficient wallet balance", {
        position: "bottom-center",
      });
      return
    }
    const payload = {
      amount: parseFloat(bb),
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

  const handleSubmit = async () => {
    const payload = {
      accountNumber: accountNumber,
      accountName: accountName,
      bankName: selectedBank?.value,
      bankCode: selectedBank?.id?.toString(),
      branchCode: "",
    };
    setLoader(true);
    var response = await dispatch(AccountPayout(payload));
    if (AccountPayout.fulfilled.match(response)) {
      setLoader(false);
      toast.error(response?.payload?.data?.message, {
        position: "bottom-center",
      });

      setTimeout(() => {
        getUserAccountDetail();
      }, 1000);
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
          <CurrencyInput
            label="Amount"
            type='amount'
            isNumeric
            userData={userData}
            placeholder={"0.00"}
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
                handlePress={() => handleWithdrawal()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Dropdown
              label="Bank Name"
              value={bankId}
              handleSelect={(e) => {
                setBankId("");
                setAccountNumber("");
                return setBankId(e);
              }}
              required
              placeholder="Select Bank Name"
              data={bankList}
            />

            <TextInput
              label="Account Number"
              placeholder="Enter your account number"
              value={accountNumber}
              disabled={!selectedBank}
              onChangeText={(e) => {
                if (e?.length === 10) {
                  getAccountDetail(e);
                  return setAccountNumber(e);
                } else {
                  setAccountName("");
                  return setAccountNumber(e);
                }
              }}
              required
            />

            <div>
              {verifyLoader ? (
                <div className="loader2" />
              ) : (
                <h5 style={{ color: "green", fontSize: 14 }}>{accountName}</h5>
              )}
            </div>

            {/* <TextInput
                  label="Amount"
                  placeholder="₦0.00"
                  required
              /> */}
          </div>

          <div style={{ display: "flex", marginTop: 30 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                isLoading={loader}
                propStyle={{
                  width: "100%",
                  backgroundColor: accountName?.length < 1 ? "gray" : "",
                }}
                handlePress={
                  accountName?.length < 1 ? () => { } : () => handleSubmit()
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankWithdraw;
