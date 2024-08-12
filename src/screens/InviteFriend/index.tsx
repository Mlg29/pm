import React, { useContext, useEffect, useState } from "react";
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
import { IPInfoContext } from "ip-info-react";


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
  const userIp = useContext(IPInfoContext);
  
  const checkHandler = () => {
    setAllowCurrency(!allowCurrency);
  };

  const checkUser = async () => {
    setCheckLoader(true);
    // setSelectedUser("");
    const response = await dispatch(getSingleUser(email));
    if (getSingleUser.fulfilled.match(response)) {
      setCheckLoader(false);
      setUsers(response?.payload);
    } else {
      var errMsg = response?.payload as string;
      setCheckLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };
  useEffect(() => {
    if(email?.length === 0) {
      setUsers([])
    }
    if (email?.length > 2) {
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
      allowOtherCurrency: allowCurrency
    };

    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  };


  const handleSelect = (data) => { 
     setEmail(data?.email);
    setSelectedUser(data?.id);
  
  };


  return (
    <div className="top-container" style={{backgroundColor: 'transparent'}}>
         {
        !isMobile && <DesktopBackButton />
      }
      <div style={{display: 'flex', flexDirection: 'column', padding: "20px 10px 40px 10px",borderRadius: 10, backgroundColor: 'white'}}>
      <Header text={"Invite Friend"} />

      <div style={{ display: "flex", flexDirection: "column", flex: 4 }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your friend email"
          required
          value={email}
          type="email"
          onChangeText={(val: string) => {
            if(selectedUser){
              setSelectedUser('')
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
          setValue={(val) => setAmount(val)}
          prefix={userIp?.currency === "NGN" ? "₦" : "$"}
        />

        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 30 }}
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

export default InviteFriend;
