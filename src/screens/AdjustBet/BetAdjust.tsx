import { useEffect, useState } from "react";
import CustomeKeyboard from "../../components/CustomKeyboard";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { TextAlign } from "../../utils/type";
import { formatCurrency } from "../../utils/helper";
import { useAppDispatch } from "../../redux/hooks";
import {
  getAdjustBet,
  getBetById,
  updateBetAdjust,
} from "../../redux/slices/BetSlice";
import { ToastContainer, toast } from "react-toastify";
import noLogo from "../../assets/images/no.jpg";
import moment from "moment";
import { getUserData } from "../../redux/slices/AuthSlice";
import { RxAvatar } from "react-icons/rx";
import Loader from "../../components/Loader";

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
  card: {
    border: "0.5px solid gray",
    padding: 20,
    borderRadius: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  div: {
    border: `1px solid ${COLORS.semiGray}`,
    padding: 10,
    marginTop: 20,
  },
  cardDiv: {
    padding: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
};

const BetAdjust = () => {
  const navigate = useNavigate();

  const id = location?.search?.replace("?", "");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [betInfo, setBetInfo] = useState<any>();
  const [betData, setBetData] = useState<any>();
  const [updateLoader, setUpdateLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const sportEvents = betData?.sportEvent?.FootballEvent;

  const user = betInfo?.bet?.userId === userData?.id;

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    } else {
    }
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getAdjustBet(id)).then((pp) => {
      setBetInfo(pp?.payload);
      dispatch(getBetById(pp?.payload?.bet?.id)).then((pp) => {
        setBetData(pp?.payload);
        setLoader(false);
      });
    });
    fetchUserInfo();
  }, [id]);


  const decideOnBet = async (status) => {
    const payload = {
      requestId: id,
      status: status,
    };
    setUpdateLoader(true);
    var response = await dispatch(updateBetAdjust(payload));
    if (updateBetAdjust.fulfilled.match(response)) {
      setUpdateLoader(false)
      // toast.success("Bet adjusted successfully", {
      //   position: "bottom-center",
      // });
      navigate('/adjust-success', {
        state: {betId: response?.payload?.data?.betId, type: status}
      })
      setTimeout(() => {
        return navigate(-1)
      }, 1000)
    } else {
      var errMsg = response?.payload as string;
      setUpdateLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  };


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
    <div className="top-container">
      <Header text="Challenge Details" />

      <div style={styles.card}>
        <p style={{ ...FONTS.body7 }}>{sportEvents?.leagueName}</p>
        <div style={styles.row}>
          <div
            style={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={
                sportEvents?.localTeamLogo ? sportEvents?.localTeamLogo : noLogo
              }
              style={{ width: 40, height: 40 }}
            />
            <h3 style={{ ...FONTS.h7 }}>{sportEvents?.localTeamName}</h3>
            <p style={{ ...FONTS.body7, textAlign: "center" }}>
              {user ? "(You)" : `@${betInfo?.requester?.userName}`}
            </p>
          </div>
          <div>
            <p style={{ ...FONTS.body7, textAlign: "center" }}>
              {moment(sportEvents?.startTime).format("MMMM Do YYYY, h:mm a")}
            </p>
            <h3 style={{ ...FONTS.h7, textAlign: "center" }}>
              {formatCurrency(betData?.betAmount)}
            </h3>
          </div>

          <div
            style={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={
                sportEvents?.visitorTeamLogo
                  ? sportEvents?.visitorTeamLogo
                  : noLogo
              }
              style={{ width: 40, height: 40 }}
            />
            <h3 style={{ ...FONTS.h7 }}>{sportEvents?.visitorTeamName}</h3>
            <p style={{ ...FONTS.body7, textAlign: "center" }}>
              {!user ? "(You)" : `@${betInfo?.requester?.userName}`}
            </p>
          </div>
        </div>
      </div>

      <div style={{ ...styles.div }}>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7, paddingBottom: 4 }}>Bet ID</p>
          <h3 style={{ ...FONTS.h6 }}>{betData?.id}</h3>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7, paddingBottom: 4 }}>Date & Time</p>
          <h3 style={{ ...FONTS.h6 }}>
            {moment(betData?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </h3>
        </div>{" "}
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7, paddingBottom: 4 }}>Adjusted Stake</p>
          <h3 style={{ ...FONTS.h6 }}>
            ₦ {formatCurrency(betInfo?.requestedAmount)}
          </h3>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Opponent</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ ...styles.row }}>
              {betInfo?.requester?.profileImage ? (
                <img
                  src={betInfo?.requester?.profileImage}
                  style={{ width: 20, height: 20, borderRadius: 20 }}
                />
              ) : (
                <RxAvatar size={20} />
              )}
              <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>
                @{betInfo?.requester?.userName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", marginTop: 30 }}>
        <Button
          text="Accept Stake"
          propStyle={{ width: "100%" }}
          isLoading={updateLoader}
          handlePress={() => decideOnBet("ACCEPTED")}
        />
        <div style={{height: 20}} />
         <Button
          text="Reject Stake"
          isLoading={updateLoader}
          propStyle={{ width: "100%",color: COLORS.primary, backgroundColor: COLORS.white, border: `1px solid ${COLORS.primary}`}}
          handlePress={() => decideOnBet("REJECTED")}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default BetAdjust;
