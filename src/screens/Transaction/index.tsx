import BottomTabs from "../../components/Tabs";
import bg from "../../assets/images/bg.png";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import {IPInfoContext} from "ip-info-react"
import send1 from "../../assets/images/send-1.svg";
import send2 from "../../assets/images/send-2.svg";
import TransactionCard from "../../components/TransactionCard";
import { useNavigate } from "react-router-dom";
import { FlexDirection } from "../../utils/type";
import { useMediaQuery } from "react-responsive";
import WithdrawalModal from "../../components/Modals/WithdrawaModal";
import DepositModal from "../../components/Modals/DepositModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserData } from "../../redux/slices/AuthSlice";
import { formatCurrency } from "../../utils/helper";
import { getTransactions } from "../../redux/slices/TransactionSlice";
import EmptyState from "../../components/EmptyState";
import Loader from "../../components/Loader";
import {
  getNotifications,
  notificationState,
} from "../../redux/slices/NotificationSlice";

const styles = {
  div: {
    backgroundImage: `url(${bg})`,
    padding: "20px 0px 0px 0px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  ctn: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0px",
  },
  rw: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: 250,
    margin: "20px 0px",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2rem 0px",
  },
  btn: {
    padding: 10,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.cream,
    padding: "15px 0px",
    borderRadius: 40,
  },
};

function Transaction() {
  const [show, setShow] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch() as any;
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const notifications = useAppSelector(notificationState) as any;
  const userIp = useContext(IPInfoContext);



  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };

  const fetchTransactions = async () => {
    const response = await dispatch(getTransactions());
    if (getTransactions.fulfilled.match(response)) {
      setTransactions(response?.payload);
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchUserInfo();
    fetchTransactions();
    getNotification();
  }, []);

  if (loader) {
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
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div style={{ ...styles.div }}>
        {isMobile && (
          <div style={{ ...styles.container }}>
            <h3 style={{ ...FONTS.h5, color: COLORS.white }}>Transaction</h3>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/notification")}
            >
              <div
                style={{
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 15,
                  height: 15,
                  borderRadius: 100,
                  position: "absolute",
                }}
              >
                <p style={{ fontSize: 8, color: "white" }}>
                  {notifications?.unreadCount}
                </p>
              </div>
              <IoIosNotificationsOutline
                size={35}
                color={COLORS.white}
                style={{
                  border: "1px solid white",
                  borderRadius: "100%",
                  padding: 5,
                }}
              />
            </div>
          </div>
        )}
        <div style={{ ...styles.ctn }}>
          <p style={{ ...FONTS.body7, color: COLORS.white }}>Account Balance</p>
          <div style={{ ...styles.rw }}>
            <p style={{ ...FONTS.body7, color: COLORS.white }}>{userData?.defaultCurrency === "NGN" ? "NGN" : "USD"}</p>
            {show ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <h2 style={{ ...FONTS.largeTitle, color: COLORS.white }}>
                  {formatCurrency(userData?.walletBalance)}
                </h2>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FaAsterisk color={COLORS.white} size={30} />
                <FaAsterisk color={COLORS.white} size={30} />
                <FaAsterisk color={COLORS.white} size={30} />
                <FaAsterisk color={COLORS.white} size={30} />
                <FaAsterisk color={COLORS.white} size={30} />
              </div>
            )}
            <div style={{ cursor: "pointer" }}>
              {show ? (
                <GoEye color={COLORS.white} onClick={() => setShow(!show)} />
              ) : (
                <GoEyeClosed
                  color={COLORS.white}
                  onClick={() => setShow(!show)}
                />
              )}
            </div>
          </div>
        </div>

        <div style={{ ...styles.btnRow }}>
          {!isMobile && <div></div>}
          <div
            style={{
              ...styles.btn,
              width: isMobile ? "35%" : "20%",
              backgroundColor: COLORS.cream,
              cursor: "pointer",
            }}
            onClick={() =>
              //isMobile ? navigate("/withdrawal") : setShowTransfer(true)
              navigate("/withdrawal")
            }
          >
            <img src={send2} />
            <p style={{ ...FONTS.h6, margin: "0px 0px 0px 10px" }}>Withdraw</p>
          </div>

          <div
            style={{
              ...styles.btn,
              width: isMobile ? "35%" : "20%",
              backgroundColor: COLORS.lightOrange,
              cursor: "pointer",
            }}
            onClick={
              () => navigate("/deposit")
              // isMobile ? navigate("/deposit") : setDeposit(true))
            }
          >
            <img src={send1} />
            <p style={{ ...FONTS.h6, margin: "0px 0px 0px 10px" }}>Deposit</p>
          </div>
          {!isMobile && <div></div>}
        </div>
      </div>
      <div className="top-container">
        <h3 style={{ ...FONTS.h5 }}>Recent Transactions</h3>
        {transactions
          ?.filter((a, b) => b < 4)
          ?.map((data, i) => {
            return (
              <div key={i}>
                <TransactionCard
                  text={`${data?.type} - ${data?.id}`}
                  amount={data?.amount}
                  date={data?.createdAt}
                  type={data?.type}

                />
              </div>
            );
          })}

        {transactions?.length < 1 && (
          <div style={{ marginTop: "-3rem" }}>
            <EmptyState header={"No Transaction Available"} />
          </div>
        )}

        {transactions?.length > 3 ? (
          <div
            style={{ ...styles.btn2, cursor: "pointer" }}
            onClick={() =>
              navigate("/transaction-list", {
                state: {
                  transactions: transactions,
                },
              })
            }
          >
            <h3 style={{ ...FONTS.h7 }}>View All</h3>
          </div>
        ) : null}

        {isMobile && <BottomTabs />}
      </div>

      <WithdrawalModal
        show={showTransfer}
        handleClose={() => setShowTransfer(false)}
      />

      <DepositModal show={deposit} handleClose={() => setDeposit(false)} />
    </div>
  );
}

export default Transaction;
