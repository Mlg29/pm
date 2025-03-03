import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSingleUser, getUserData, userState } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import NumberInput from "../../components/NumberInput";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { IPInfoContext } from "ip-info-react";
import { getFxRate } from "../../redux/slices/MiscSlice";

const InviteFriend = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<any>("");
  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [checkLoader, setCheckLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [allowCurrency, setAllowCurrency] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [exRate, setExRate] = useState(null);
  const userData = useAppSelector(userState);

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  const handleFxRate = async (amount) => {
    const rateData = {
      sourceCurrency: userData?.defaultCurrency === "USD" ? "USD" : "NGN",
      destinationCurrency: userData?.defaultCurrency === "USD" ? "NGN" : "USD",
      amount: amount,
    };

    await dispatch(getFxRate(rateData)).then((pp) => {
      setExRate(pp?.payload?.data);
    });
  };

  const checkHandler = () => {
    setAllowCurrency(!allowCurrency);
  };

  const checkUser = async () => {
    setCheckLoader(true);
    // setSelectedUser("");
    const response = await dispatch(getSingleUser(email));
    if (getSingleUser.fulfilled.match(response)) {
      const user = await response?.payload?.filter(m => m.userName.toLowerCase().includes(email?.toLowerCase()) || m.email?.toLowerCase().includes(email?.toLowerCase()))
      setCheckLoader(false);
      setUsers(user);
    } else {
      var errMsg = response?.payload as string;
      setCheckLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    if (email?.length === 0) {
      setUsers([]);
    }
    if (!email?.includes('@')) {
      setAmount("0")
    }
    if (email?.includes("@")) {
      checkUser();
    }
  }, [email]);

  const handleRoute = async () => {
    if (!selectedUser && !email) {
      toast.error("Invalid user selected", {
        position: "bottom-center",
      });
      return;
    }
    if (!amount) {
      toast.error("Amount is required", {
        position: "bottom-center",
      });
      return;
    }
    const payload = {
      invitedUser: email,
      amount: amount,
      allowOtherCurrency: true,
    };

    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  };

  const handleSelect = (data) => {
    setEmail(data?.email);
    setSelectedUser(data?.id);
  };

  const checkSelectedUserDetail = users?.find((dd) => dd?.id === selectedUser);


  return (
    <div className="top-container" style={{ backgroundColor: "transparent" }}>
      {!isMobile && <DesktopBackButton />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 10px 40px 10px",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Header text={"Invite Friend"} />

        <div style={{ display: "flex", flexDirection: "column", flex: 4 }}>
          <TextInput
            label="Email Address"
            placeholder="Enter your friend email"
            required
            value={email}
            type="email"
            onChangeText={(val: string) => {
              if (selectedUser) {
                setSelectedUser("");
              }
              setEmail(val);
            }}
          />
          {users?.length > 0 && !selectedUser && (
            <div>
              <p style={{ ...FONTS.h7 }}>Select User</p>
              {users?.map((data, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      padding: 8,
                      border: `1px solid ${COLORS.orange}`,
                      marginBottom: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSelect(data)}
                  >
                    <p style={{ ...FONTS.body7 }}>
                      {data?.firstName} {data?.lastName}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            required
            value={amount}
            setValue={(val) => {
              setAmount(val);
              handleFxRate(val);
            }}
            prefix={userData?.defaultCurrency === "NGN" ? "₦" : userData?.defaultCurrency === "USD" ? "$" : ""}
          />

          {(exRate && email && amount && checkSelectedUserDetail && (checkSelectedUserDetail?.defaultCurrency !== userData?.defaultCurrency)) ? (
            <div style={{ marginTop: 30 }}>
              <p>
                The invited participant has a {checkSelectedUserDetail?.defaultCurrency} account. {checkSelectedUserDetail?.defaultCurrency} equivalence of
                your bet amount is: {checkSelectedUserDetail?.defaultCurrency === "NGN" ? "₦" : "$"}{exRate?.rate * parseInt(amount)}
              </p>

              <div
                style={{
                  backgroundColor: "#f9f2f1",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginTop: 20
                }}
              >
                <p style={{ fontSize: 12, marginBottom: 5 }}>Current Rate</p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 'bold' }}>{exRate?.rate} {"="} {userData?.defaultCurrency === "NGN" ? "₦" : userData?.defaultCurrency === "USD" ? "$" : ""}1</p>
                </div>
              </div>
            </div>
          ) : null}


          {(exRate && email && amount && !checkSelectedUserDetail && userData?.defaultCurrency === "NGN") ? (
            <div style={{ marginTop: 30 }}>
              <p>
                If the invited participant sets up a USD account, the USD equivalence of your bet amount is:  ${exRate?.rate * parseInt(amount)}
              </p>

              <div
                style={{
                  backgroundColor: "#f9f2f1",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginTop: 20
                }}
              >
                <p style={{ fontSize: 12, marginBottom: 5 }}>Current Rate</p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 'bold' }}>{exRate?.rate} {"="} {userData?.defaultCurrency === "NGN" ? "₦" : userData?.defaultCurrency === "USD" ? "$" : ""}1</p>
                </div>
              </div>
            </div>
          ) : null}



          {(exRate && email && amount && !checkSelectedUserDetail && userData?.defaultCurrency === "USD") ? (
            <div style={{ marginTop: 30 }}>
              <p>
                All bets on this platform are primarily placed in USD. However, if your opponent is based in Nigeria, the bet will be processed in Nigerian Naira (NGN). Naira equivalence of your bet amount: ₦{exRate?.rate * parseInt(amount)}
              </p>

              <div
                style={{
                  backgroundColor: "#f9f2f1",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginTop: 20
                }}
              >
                <p style={{ fontSize: 12, marginBottom: 5 }}>Current Rate</p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 'bold' }}>{exRate?.rate} {"="} {userData?.defaultCurrency === "NGN" ? "₦" : userData?.defaultCurrency === "USD" ? "$" : ""}1</p>
                  <p style={{ fontSize: 10, fontWeight: '400', marginTop: 5, marginBottom: 5 }}>Incase opponent base currency is different from USD, the bet will be subject to the applicable FX rate.</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: 20 }}>
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

export default InviteFriend;
