import BottomTabs from "../../components/Tabs";
import notification from "../../assets/images/notification.svg";
import { useNavigate } from "react-router-dom";
import { styles } from "./style";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import SlipCard from "../../components/SlipCard";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import user from "../../assets/images/user.svg";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBetHistory, settleBet } from "../../redux/slices/BetSlice";
import moment from "moment";
import {
  getUserData,
  loginState,
  userState,
} from "../../redux/slices/AuthSlice";
import Loader from "../../components/Loader";
import {
  getNotifications,
  notificationState,
} from "../../redux/slices/NotificationSlice";
import arrowleft from "../../assets/images/arrow-left.svg"


interface Log {
  date: string;
}

function BetSlip() {
  const navigate = useNavigate();
  const [active, setActive] = useState("PENDING");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  // const userData = useAppSelector(userState);
  const [userData, setUserData] = useState<any>(null)
  const [betList, setBetList] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const notifications = useAppSelector(notificationState) as any;

  const getNotification = async () => {
    await dispatch(getNotifications());
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
    const getFetch = async () => {
      const token = localStorage.getItem("token")
      setLoader(true);
      if (token) {
        await fetchUserInfo();
      }
      setLoader(false);
    }
    getFetch()

  }, []);

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    const payload = {
      status: active,
    };
    setLoader(true);

    dispatch(getBetHistory(payload)).then((pp) => {
      setBetList(pp?.payload);
      setLoader(false);
    });
  }, [active]);


  const fetchBetData = () => {
    const payload = {
      status: active,
    };

    dispatch(getBetHistory(payload)).then((pp) => {

      return pp?.payload?.map(dd => {

        const payloadData = {
          betId: dd?.id,
          outcome: userData?.id === dd?.userId ? dd?.prediction : dd?.opponentPrediction
        }
        dispatch(settleBet(payloadData)).then(aa => console.log({ aa }))



      })


    });
  }

  console.log({ betList })


  // useEffect(() => {
  //   const interval = setInterval(fetchBetData, 5000);
  //   return () => clearInterval(interval);
  // }, []);


  const groupByDate = (data) => {
    return data?.reduce((acc, item) => {
      const date = moment(item?.createdAt).format("DD-MMM-YYYY");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]?.push(item);
      return acc;
    }, {});
  };
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const months: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(parseInt(year), months[month], parseInt(day));
  };

  const groupedData = groupByDate(betList);



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
  console.log({ betList })
  return (
    <div className="top-container">
      <div style={{ marginTop: 10, cursor: "pointer" }} onClick={() => {
        navigate(-1)
      }}>
        <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />

      </div>
      <div style={{ ...styles.container }}>

        <h3>Bet Slip</h3>
        {isMobile && (
          <div>
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
            <img
              src={notification}
              onClick={() => navigate("/notification")}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
      <div style={{ ...styles.tabs, overflowX: "scroll" }}>
        <div
          style={{
            ...styles.tb,
            backgroundColor:
              active === "PENDING" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("PENDING")}
        >
          <p style={{ ...FONTS.body6 }}>Pending</p>
        </div>
        <div
          style={{
            ...styles.tb,
            backgroundColor: active === "ACTIVE" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("ACTIVE")}
        >
          <p style={{ ...FONTS.body6 }}>Active</p>
        </div>
        <div
          style={{
            ...styles.tb,
            backgroundColor:
              active === "SETTLED" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("SETTLED")}
        >
          <p style={{ ...FONTS.body6 }}>Settled</p>
        </div>
        <div
          style={{
            ...styles.tb,
            backgroundColor:
              active === "CANCELED" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("CANCELED")}
        >
          <p style={{ ...FONTS.body6 }}>Canceled</p>
        </div>
      </div>

      <div>
        {active !== "SETTLED" && (
          <div>
            {groupedData &&
              Object?.keys(groupedData)
                ?.sort(
                  (a: any, b: any) =>
                    parseDate(b).getTime() - parseDate(a).getTime()
                )
                // .reverse()
                .map((date) => {
                  return (
                    <div key={date}>
                      <p
                        style={{
                          ...FONTS.body7,
                          color: COLORS.gray,
                          margin: "15px 0px",
                        }}
                      >
                        {date}
                      </p>
                      <div>
                        {groupedData[date]?.reverse()?.map((item, i) => {

                          return (
                            <div key={i}>
                              {item?.sportEvent?.sport === "FOOTBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.FootballEvent
                                      ?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.FootballEvent
                                      ?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.FootballEvent
                                      ?.localTeamGoals
                                  }
                                  awayScore={
                                    item?.sportEvent?.FootballEvent
                                      ?.visitorTeamGoals
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "BASKETBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.BasketballEvent
                                      ?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.BasketballEvent
                                      ?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.BasketballEvent
                                      ?.localTeamScores?.total
                                  }
                                  awayScore={
                                    item?.sportEvent?.BasketballEvent
                                      ?.visitorTeamScores?.total
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "TENNIS" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.TennisEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.TennisEvent?.visitorTeamName
                                  }
                                  homeScore={'-'
                                  }
                                  awayScore={'-'
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "HORSE_RACING" && (
                                <SlipCard
                                  multipleEntry
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "BOXING" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.BoxingEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.BoxingEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.BoxingEvent?.localteam
                                      ?.round
                                      ? item?.sportEvent?.BoxingEvent?.localteam
                                        ?.round
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.BoxingEvent?.awayteam
                                      ?.round
                                      ? item?.sportEvent?.BoxingEvent?.awayteam
                                        ?.round
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "ESPORT" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.EsportEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.EsportEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.EsportEvent?.localteam
                                      ?.score
                                      ? item?.sportEvent?.EsportEvent?.localteam
                                        ?.score
                                      : "-"
                                  }
                                  awayScore={
                                    item?.sportEvent?.EsportEvent?.awayteam
                                      ?.score
                                      ? item?.sportEvent?.EsportEvent?.awayteam
                                        ?.score
                                      : "-"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "DART" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.DartEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.DartEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.DartEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.DartEvent?.localTeam
                                        ?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.DartEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.DartEvent?.awayTeam
                                        ?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "MMA" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.MmaEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.MmaEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.MmaEvent?.localteam?.round
                                      ? item?.sportEvent?.MmaEvent?.localteam
                                        ?.round
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.MmaEvent?.awayteam?.round
                                      ? item?.sportEvent?.MmaEvent?.awayteam
                                        ?.round
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "SNOOKER" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.SnookerEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.SnookerEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.SnookerEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.SnookerEvent
                                        ?.localteam?.totalscore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.SnookerEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.SnookerEvent?.awayteam
                                        ?.totalscore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "VOLLYBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.VollyBallEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.VollyBallEvent?.visitorTeamName

                                  }
                                  homeScore={
                                    item?.sportEvent?.VollyBallEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.VollyBallEvent
                                        ?.localTeam?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.VollyBallEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.VollyBallEvent
                                        ?.awayTeam?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "HANDBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.HandBallEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.HandBallEvent?.visitorTeamName

                                  }
                                  homeScore={
                                    item?.sportEvent?.HandBallEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.HandBallEvent
                                        ?.localTeam?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.HandBallEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.HandBallEvent
                                        ?.awayTeam?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "AFL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.AflEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.AflEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.AflEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.AflEvent?.localteam
                                        ?.totalscore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.AflEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.AflEvent?.awayteam
                                        ?.totalscore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "FUTSAL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.FutsalEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.FutsalEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.FutsalEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.FutsalEvent?.localteam
                                        ?.totalscore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.FutsalEvent?.awayteam
                                      ?.goals
                                      ? item?.sportEvent?.FutsalEvent?.awayteam
                                        ?.goals
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "CRICKET" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.CricketEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.CricketEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.CricketEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.CricketEvent?.localteam
                                        ?.totalscore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.CricketEvent?.awayteam
                                      ?.goals
                                      ? item?.sportEvent?.CricketEvent?.awayteam
                                        ?.goals
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "NASCAR" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.NascarEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.NascarEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.NascarEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.NascarEvent?.localteam
                                        ?.totalscore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.NascarEvent?.awayteam
                                      ?.goals
                                      ? item?.sportEvent?.NascarEvent?.awayteam
                                        ?.goals
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "BASEBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.BaseballEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.BaseballEvent?.visitorTeamName
                                  }
                                  homeScore={
                                    item?.sportEvent?.BaseballEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.BaseballEvent?.localTeam
                                        ?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.BaseballEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.BaseballEvent?.awayTeam
                                        ?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "ICE_HOCKEY" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.IceHockeyEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.IceHockeyEvent?.visitorTeamName

                                  }
                                  homeScore={
                                    item?.sportEvent?.IceHockeyEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.IceHockeyEvent
                                        ?.localTeam?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.IceHockeyEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.IceHockeyEvent
                                        ?.awayTeam?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "TABLE_TENNIS" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.TableTennisEvent?.localTeamName
                                  }
                                  awayName={
                                    item?.sportEvent?.TableTennisEvent?.visitorTeamName

                                  }
                                  homeScore={
                                    item?.sportEvent?.TableTennisEvent?.localTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.TableTennisEvent
                                        ?.localTeam?.totalScore
                                      : ""
                                  }
                                  awayScore={
                                    item?.sportEvent?.TableTennisEvent?.awayTeam
                                      ?.totalScore
                                      ? item?.sportEvent?.TableTennisEvent
                                        ?.awayTeam?.totalScore
                                      : ""
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
          </div>
        )}

        {active === "SETTLED" && (
          <div>
            {groupedData &&
              Object?.keys(groupedData)
                ?.sort(
                  (a: any, b: any) =>
                    parseDate(b).getTime() - parseDate(a).getTime()
                )
                ?.map((date) => (
                  <div key={date}>
                    <p
                      style={{
                        ...FONTS.body7,
                        color: COLORS.gray,
                        margin: "15px 0px",
                      }}
                    >
                      {date}
                    </p>
                    <div>
                      {groupedData[date]?.reverse()?.map((item, i) => {
                        return (
                          <div key={i}>
                            {item?.sportEvent?.sport === "FOOTBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.FootballEvent
                                    ?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.FootballEvent
                                    ?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.FootballEvent
                                    ?.localTeamGoals
                                }
                                awayScore={
                                  item?.sportEvent?.FootballEvent
                                    ?.visitorTeamGoals
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "BASKETBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.BasketballEvent
                                    ?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.BasketballEvent
                                    ?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.BasketballEvent
                                    ?.localTeamScores?.total
                                }
                                awayScore={
                                  item?.sportEvent?.BasketballEvent
                                    ?.visitorTeamScores?.total
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "TENNIS" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.TennisEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.TennisEvent?.visitorTeamName
                                }
                                homeScore={'-'
                                }
                                awayScore={'-'
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "HORSE_RACING" && (
                              <SlipCard
                                multipleEntry
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "BOXING" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.BoxingEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.BoxingEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.BoxingEvent?.localteam
                                    ?.round
                                    ? item?.sportEvent?.BoxingEvent?.localteam
                                      ?.round
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.BoxingEvent?.awayteam
                                    ?.round
                                    ? item?.sportEvent?.BoxingEvent?.awayteam
                                      ?.round
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "ESPORT" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.EsportEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.EsportEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.EsportEvent?.localteam
                                    ?.score
                                    ? item?.sportEvent?.EsportEvent?.localteam
                                      ?.score
                                    : "-"
                                }
                                awayScore={
                                  item?.sportEvent?.EsportEvent?.awayteam
                                    ?.score
                                    ? item?.sportEvent?.EsportEvent?.awayteam
                                      ?.score
                                    : "-"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "DART" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.DartEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.DartEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.DartEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.DartEvent?.localTeam
                                      ?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.DartEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.DartEvent?.awayTeam
                                      ?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "MMA" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.MmaEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.MmaEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.MmaEvent?.localteam?.round
                                    ? item?.sportEvent?.MmaEvent?.localteam
                                      ?.round
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.MmaEvent?.awayteam?.round
                                    ? item?.sportEvent?.MmaEvent?.awayteam
                                      ?.round
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "SNOOKER" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.SnookerEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.SnookerEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.SnookerEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.SnookerEvent
                                      ?.localteam?.totalscore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.SnookerEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.SnookerEvent?.awayteam
                                      ?.totalscore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "VOLLYBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.VollyBallEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.VollyBallEvent?.visitorTeamName

                                }
                                homeScore={
                                  item?.sportEvent?.VollyBallEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.VollyBallEvent
                                      ?.localTeam?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.VollyBallEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.VollyBallEvent
                                      ?.awayTeam?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "HANDBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.HandBallEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.HandBallEvent?.visitorTeamName

                                }
                                homeScore={
                                  item?.sportEvent?.HandBallEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.HandBallEvent
                                      ?.localTeam?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.HandBallEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.HandBallEvent
                                      ?.awayTeam?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "AFL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.AflEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.AflEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.AflEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.AflEvent?.localteam
                                      ?.totalscore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.AflEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.AflEvent?.awayteam
                                      ?.totalscore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "FUTSAL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.FutsalEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.FutsalEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.FutsalEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.FutsalEvent?.localteam
                                      ?.totalscore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.FutsalEvent?.awayteam
                                    ?.goals
                                    ? item?.sportEvent?.FutsalEvent?.awayteam
                                      ?.goals
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "CRICKET" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.CricketEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.CricketEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.CricketEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.CricketEvent?.localteam
                                      ?.totalscore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.CricketEvent?.awayteam
                                    ?.goals
                                    ? item?.sportEvent?.CricketEvent?.awayteam
                                      ?.goals
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "NASCAR" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.NascarEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.NascarEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.NascarEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.NascarEvent?.localteam
                                      ?.totalscore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.NascarEvent?.awayteam
                                    ?.goals
                                    ? item?.sportEvent?.NascarEvent?.awayteam
                                      ?.goals
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "BASEBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.BaseballEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.BaseballEvent?.visitorTeamName
                                }
                                homeScore={
                                  item?.sportEvent?.BaseballEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.BaseballEvent?.localTeam
                                      ?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.BaseballEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.BaseballEvent?.awayTeam
                                      ?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "ICE_HOCKEY" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.IceHockeyEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.IceHockeyEvent?.visitorTeamName

                                }
                                homeScore={
                                  item?.sportEvent?.IceHockeyEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.IceHockeyEvent
                                      ?.localTeam?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.IceHockeyEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.IceHockeyEvent
                                      ?.awayTeam?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "TABLE_TENNIS" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.TableTennisEvent?.localTeamName
                                }
                                awayName={
                                  item?.sportEvent?.TableTennisEvent?.visitorTeamName

                                }
                                homeScore={
                                  item?.sportEvent?.TableTennisEvent?.localTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.TableTennisEvent
                                      ?.localTeam?.totalScore
                                    : ""
                                }
                                awayScore={
                                  item?.sportEvent?.TableTennisEvent?.awayTeam
                                    ?.totalScore
                                    ? item?.sportEvent?.TableTennisEvent
                                      ?.awayTeam?.totalScore
                                    : ""
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.winnerId === userData?.id ? item?.amountWon : item?.userId === userData?.id ? item?.betAmount : item?.opponentId === userData?.id ? item?.opponentBetAmount : 0
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>

      {betList?.length < 1 && (
        <div>
          <EmptyState
            header={`No ${active} bet`}
            text={`${active} bet will be displayed here.`}
          />
        </div>
      )}

      {isMobile && <BottomTabs />}
    </div>
  );
}

export default BetSlip;
