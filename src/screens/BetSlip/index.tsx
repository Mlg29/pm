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
import { getBetHistory } from "../../redux/slices/BetSlice";
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
  const userData = useAppSelector(userState);
  const [betList, setBetList] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const notifications = useAppSelector(notificationState) as any;

  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  useEffect(() => {
    dispatch(getUserData());
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
              active === "REFUNDED" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("REFUNDED")}
        >
          <p style={{ ...FONTS.body6 }}>Refunded</p>
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
                        {groupedData[date]?.map((item, i) => {
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
                                    item?.betAmount || item?.opponentBetAmount
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
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "TENNIS" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.TennisEvent?.player[0][
                                    "@name"
                                    ]
                                  }
                                  awayName={
                                    item?.sportEvent?.TennisEvent?.player[1][
                                    "@name"
                                    ]
                                  }
                                  homeScore={
                                    item?.sportEvent?.TennisEvent?.player[0][
                                    "@totalscore"
                                    ]
                                  }
                                  awayScore={
                                    item?.sportEvent?.TennisEvent?.player[1][
                                    "@totalscore"
                                    ]
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
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
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "BOXING" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.BoxingEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.BoxingEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.BoxingEvent?.localteam
                                      ?.round
                                      ? item?.sportEvent?.BoxingEvent?.localteam
                                        ?.round
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.BoxingEvent?.awayteam
                                      ?.round
                                      ? item?.sportEvent?.BoxingEvent?.awayteam
                                        ?.round
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "ESPORT" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.EsportEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.EsportEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.EsportEvent?.localteam
                                      ?.score
                                      ? item?.sportEvent?.EsportEvent?.localteam
                                        ?.score
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.EsportEvent?.awayteam
                                      ?.score
                                      ? item?.sportEvent?.EsportEvent?.awayteam
                                        ?.score
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "DART" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.DartEvent?.localteam?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.DartEvent?.awayteam?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.DartEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.DartEvent?.localteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.DartEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.DartEvent?.awayteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "MMA" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.MmaEvent?.localteam?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.MmaEvent?.awayteam?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.MmaEvent?.localteam?.round
                                      ? item?.sportEvent?.MmaEvent?.localteam
                                        ?.round
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.MmaEvent?.awayteam?.round
                                      ? item?.sportEvent?.MmaEvent?.awayteam
                                        ?.round
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "SNOOKER" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.SnookerEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.SnookerEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.SnookerEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.SnookerEvent
                                        ?.localteam?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.SnookerEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.SnookerEvent?.awayteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "VOLLYBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.VollyBallEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.VollyBallEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.VollyBallEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.VollyBallEvent
                                        ?.localteam?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.VollyBallEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.VollyBallEvent
                                        ?.awayteam?.totalscore
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}
                              {item?.sportEvent?.sport === "HANDBALL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.HandBallEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.HandBallEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.HandBallEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.HandBallEvent
                                        ?.localteam?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.HandBallEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.HandBallEvent
                                        ?.awayteam?.totalscore
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "AFL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.AflEvent?.localteam?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.AflEvent?.awayteam?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.AflEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.AflEvent?.localteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.AflEvent?.awayteam
                                      ?.totalscore
                                      ? item?.sportEvent?.AflEvent?.awayteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "FUTSAL" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.FutsalEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.FutsalEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.FutsalEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.FutsalEvent?.localteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.FutsalEvent?.awayteam
                                      ?.goals
                                      ? item?.sportEvent?.FutsalEvent?.awayteam
                                        ?.goals
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
                                  }
                                  isUser={userData}
                                  betCurrency={item?.betCurrency}
                                  data={item}
                                />
                              )}

                              {item?.sportEvent?.sport === "CRICKET" && (
                                <SlipCard
                                  homeName={
                                    item?.sportEvent?.CricketEvent?.localteam
                                      ?.name
                                  }
                                  awayName={
                                    item?.sportEvent?.CricketEvent?.awayteam
                                      ?.name
                                  }
                                  homeScore={
                                    item?.sportEvent?.CricketEvent?.localteam
                                      ?.totalscore
                                      ? item?.sportEvent?.CricketEvent?.localteam
                                        ?.totalscore
                                      : "0"
                                  }
                                  awayScore={
                                    item?.sportEvent?.CricketEvent?.awayteam
                                      ?.goals
                                      ? item?.sportEvent?.CricketEvent?.awayteam
                                        ?.goals
                                      : "0"
                                  }
                                  isWin={item?.winnerId}
                                  amount={
                                    item?.betAmount || item?.opponentBetAmount
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
                                  item?.sportEvent?.FootballEvent?.localTeamName
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
                                  item?.betAmount || item?.opponentBetAmount
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
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "TENNIS" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.TennisEvent?.player[0][
                                  "@name"
                                  ]
                                }
                                awayName={
                                  item?.sportEvent?.TennisEvent?.player[1][
                                  "@name"
                                  ]
                                }
                                homeScore={
                                  item?.sportEvent?.TennisEvent?.player[0][
                                  "@totalscore"
                                  ]
                                }
                                awayScore={
                                  item?.sportEvent?.TennisEvent?.player[1][
                                  "@totalscore"
                                  ]
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
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
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "BOXING" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.BoxingEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.BoxingEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.BoxingEvent?.localteam
                                    ?.round
                                    ? item?.sportEvent?.BoxingEvent?.localteam
                                      ?.round
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.BoxingEvent?.awayteam?.round
                                    ? item?.sportEvent?.BoxingEvent?.awayteam
                                      ?.round
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "ESPORT" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.EsportEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.EsportEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.EsportEvent?.localteam
                                    ?.score
                                    ? item?.sportEvent?.EsportEvent?.localteam
                                      ?.score
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.EsportEvent?.awayteam?.score
                                    ? item?.sportEvent?.EsportEvent?.awayteam
                                      ?.score
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "DART" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.DartEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.DartEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.DartEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.DartEvent?.localteam
                                      ?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.DartEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.DartEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "MMA" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.MmaEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.MmaEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.MmaEvent?.localteam?.round
                                    ? item?.sportEvent?.MmaEvent?.localteam
                                      ?.round
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.MmaEvent?.awayteam?.round
                                    ? item?.sportEvent?.MmaEvent?.awayteam
                                      ?.round
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "SNOOKER" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.SnookerEvent?.localteam
                                    ?.name
                                }
                                awayName={
                                  item?.sportEvent?.SnookerEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.SnookerEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.SnookerEvent?.localteam
                                      ?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.SnookerEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.SnookerEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "VOLLYBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.VollyBallEvent?.localteam
                                    ?.name
                                }
                                awayName={
                                  item?.sportEvent?.VollyBallEvent?.awayteam
                                    ?.name
                                }
                                homeScore={
                                  item?.sportEvent?.VollyBallEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.VollyBallEvent
                                      ?.localteam?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.VollyBallEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.VollyBallEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "HANDBALL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.HandBallEvent?.localteam
                                    ?.name
                                }
                                awayName={
                                  item?.sportEvent?.HandBallEvent?.awayteam
                                    ?.name
                                }
                                homeScore={
                                  item?.sportEvent?.HandBallEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.HandBallEvent?.localteam
                                      ?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.HandBallEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.HandBallEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "AFL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.AflEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.AflEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.AflEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.AflEvent?.localteam
                                      ?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.AflEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.AflEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}

                            {item?.sportEvent?.sport === "FUTSAL" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.FutsalEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.FutsalEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.FutsalEvent?.localteam
                                    ?.goals
                                    ? item?.sportEvent?.FutsalEvent?.localteam
                                      ?.goals
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.FutsalEvent?.awayteam
                                    ?.totalscore
                                    ? item?.sportEvent?.FutsalEvent?.awayteam
                                      ?.totalscore
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
                                }
                                isUser={userData}
                                betCurrency={item?.betCurrency}
                                data={item}
                              />
                            )}
                            {item?.sportEvent?.sport === "CRICKET" && (
                              <SlipCard
                                homeName={
                                  item?.sportEvent?.CricketEvent?.localteam?.name
                                }
                                awayName={
                                  item?.sportEvent?.CricketEvent?.awayteam?.name
                                }
                                homeScore={
                                  item?.sportEvent?.CricketEvent?.localteam
                                    ?.totalscore
                                    ? item?.sportEvent?.CricketEvent?.localteam
                                      ?.totalscore
                                    : "0"
                                }
                                awayScore={
                                  item?.sportEvent?.CricketEvent?.awayteam?.goals
                                    ? item?.sportEvent?.CricketEvent?.awayteam
                                      ?.goals
                                    : "0"
                                }
                                isWin={item?.winnerId}
                                amount={
                                  item?.betAmount || item?.opponentBetAmount
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
