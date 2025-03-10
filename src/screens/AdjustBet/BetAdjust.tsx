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
import TennisGameCard from "../../components/GameCard/TennisGameCard";
import TennisCard from "../../components/GameDetailCardHeader/TennisCard";
import HorseCard from "../../components/GameDetailCardHeader/HorseCard";
import BoxingCard from "../../components/GameDetailCardHeader/BoxingCard";
import MmaCard from "../../components/GameDetailCardHeader/MmaCard";
import BasketballCard from "../../components/GameDetailCardHeader/BasketballCard";
import EsportCard from "../../components/GameDetailCardHeader/EsportCard";
import DartCard from "../../components/GameDetailCardHeader/DartCard";
import SnookerCard from "../../components/GameDetailCardHeader/SnookerCard";
import VolleyballCard from "../../components/GameDetailCardHeader/VolleyballCard";
import HandballCard from "../../components/GameDetailCardHeader/HandballCard";
import AflCard from "../../components/GameDetailCardHeader/AflCard";
import FutsalCard from "../../components/GameDetailCardHeader/FutsalCard";
import CricketCard from "../../components/GameDetailCardHeader/CricketCard";
import { getFxRate } from "../../redux/slices/MiscSlice";
import arrowleft from "../../assets/images/arrow-left.svg"
import { useMediaQuery } from "react-responsive";
import NascarCardHeader from "../../components/GameDetailCardHeader/NascarCardHeader";
import BaseballCard from "../../components/GameDetailCardHeader/BaseballCard";


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
  const events = betData?.sportEvent;
  const sportEvents = events;
  const [exAmount, setExAmount] = useState<any>("");
  const [type, setType] = useState("")
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const user = betInfo?.bet?.userId === userData?.id;


  console.log({ betInfo, betData })
  const handleExRate = async (data) => {
    const rateData = {
      sourceCurrency: data?.requesterCurrency === "USD" ? "USD" : "NGN",
      destinationCurrency: data?.bet?.betCurrency === "USD" ? "USD" : "NGN",
      amount: data?.requestedAmount
    }

    const newAmount = await dispatch(getFxRate(rateData)).then(pp => {

      const expectedAmount = pp?.payload?.data?.rate * data?.requestedAmount

      return expectedAmount
    })

    setExAmount(newAmount)


  };

  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    } else {
      handleLogOut()
    }
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getAdjustBet(id)).then((pp) => {
      setBetInfo(pp?.payload);
      handleExRate(pp?.payload)
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
      betOwnerAmount: betInfo?.bet?.betCurrency === betInfo?.requesterCurrency ? parseFloat(parseFloat(betInfo?.requestedAmount).toFixed(2)) : parseFloat(parseFloat(exAmount).toFixed(2))
    };

    setType(status)
    setUpdateLoader(true);

    var response = await dispatch(updateBetAdjust(payload));
    if (updateBetAdjust.fulfilled.match(response)) {
      setUpdateLoader(false);
      // toast.success("Bet adjusted successfully", {
      //   position: "bottom-center",
      // });
      navigate("/adjust-success", {
        state: { betId: response?.payload?.data?.betId, type: status },
      });
      setTimeout(() => {
        return navigate("/home");
      }, 1000);
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

      {isMobile && <Header text="Challenge Details" />}
      {
        isMobile ? null :
          <div style={{ marginTop: 10, cursor: "pointer", marginBottom: 10 }} onClick={() => {
            navigate(-1)
          }}>
            <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />

          </div>
      }

      {sportEvents?.sport === "FOOTBALL" && (
        <div style={styles.card}>
          <p style={{ ...FONTS.body7 }}>
            {sportEvents?.FootballEvent?.leagueName}
          </p>
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
                  sportEvents?.FootballEvent?.localTeamLogo
                    ? sportEvents?.FootballEvent?.localTeamLogo
                    : noLogo
                }
                style={{ width: 40, height: 40 }}
              />
              <h3 style={{ ...FONTS.h7 }}>
                {sportEvents?.FootballEvent?.localTeamName}
              </h3>
              <p style={{ ...FONTS.body7, textAlign: "center" }}>
                {user ? "(You)" : `@${betInfo?.requester?.userName}`}
              </p>
            </div>
            <div>
              <p style={{ ...FONTS.body7, textAlign: "center" }}>
                {moment(sportEvents?.FootballEvent?.startTime).format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </p>
              <h3 style={{ ...FONTS.h7, textAlign: "center" }}>
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount)}
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
                  sportEvents?.FootballEvent?.visitorTeamLogo
                    ? sportEvents?.FootballEvent?.visitorTeamLogo
                    : noLogo
                }
                style={{ width: 40, height: 40 }}
              />
              <h3 style={{ ...FONTS.h7 }}>
                {sportEvents?.FootballEvent?.visitorTeamName}
              </h3>
              <p style={{ ...FONTS.body7, textAlign: "center" }}>
                {!user ? "(You)" : `@${betInfo?.requester?.userName}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {sportEvents?.sport === "TENNIS" && (
        <TennisCard data={sportEvents?.TennisEvent} />
      )}

      {sportEvents?.sport === "BASKETBALL" && (
        <BasketballCard data={sportEvents?.BasketballEvent} />
      )}

      {sportEvents?.sport === "BOXING" && (
        <BoxingCard data={sportEvents?.BoxingEvent} />
      )}
      {sportEvents?.sport === "ESPORT" && (
        <EsportCard data={sportEvents?.EsportEvent} />
      )}

      {sportEvents?.sport === "DART" && (
        <DartCard data={sportEvents?.DartEvent} />
      )}

      {sportEvents?.sport === "SNOOKER" && (
        <SnookerCard data={sportEvents?.SnookerEvent} />
      )}

      {sportEvents?.sport === "VOLLYBALL" && (
        <VolleyballCard data={sportEvents?.VollyBallEvent} />
      )}
      {sportEvents?.sport === "HANDBALL" && (
        <HandballCard data={sportEvents?.HandBallEvent} />
      )}
      {sportEvents?.sport === "AFL" && <AflCard data={sportEvents?.AflEvent} />}
      {sportEvents?.sport === "MMA" && <MmaCard data={sportEvents?.MmaEvent} />}

      {sportEvents?.sport === "HORSE_RACING" && (
        <HorseCard gameInfo={sportEvents?.HorseEvent} />
      )}
      {sportEvents?.sport === "FUTSAL" && (
        <FutsalCard gameInfo={sportEvents?.FutsalEvent} />
      )}
      {sportEvents?.sport === "CRICKET" && (
        <CricketCard data={sportEvents?.CricketEvent} />
      )}
      {sportEvents?.sport === "NASCAR" && (
        <NascarCardHeader gameInfo={sportEvents?.CricketEvent} />
      )}
      {sportEvents?.sport === "BASEBALL" && (
        <BaseballCard data={sportEvents?.CricketEvent} />
      )}

      <div style={{ ...styles.div }}>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7, paddingBottom: 4 }}>Status</p>
          <h3 style={{ ...FONTS.h6, color: betInfo?.status === "PENDING" ? "blue" : betInfo?.status === "ACCEPTED" ? "green" : betInfo?.status === "REJECTED" ? "red" : "" }}>{betInfo?.status}</h3>
        </div>
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
            {betInfo?.bet?.betCurrency === "USD" ? "$" : "₦"}{betInfo?.bet?.betCurrency === betInfo?.requesterCurrency ? formatCurrency(betInfo?.requestedAmount) : formatCurrency(exAmount)}
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

      {
        betInfo?.status === "ACCEPTED" || betInfo?.status === "REJECTED" ? null
          :
          <div style={{ width: "100%", marginTop: 30 }}>
            <Button
              text="Accept Stake"
              propStyle={{ width: "100%" }}
              isLoading={updateLoader && type === "ACCEPTED"}
              handlePress={() => decideOnBet("ACCEPTED")}
            />
            <div style={{ height: 20 }} />
            <Button
              text="Reject Stake"
              isLoading={updateLoader && type === "REJECTED"}
              propStyle={{
                width: "100%",
                color: COLORS.primary,
                backgroundColor: COLORS.white,
                border: `1px solid ${COLORS.primary}`,
              }}
              handlePress={() => decideOnBet("REJECTED")}
            />
          </div>

      }
      <ToastContainer />
    </div>
  );
};

export default BetAdjust;
