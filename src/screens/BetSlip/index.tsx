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
import { Badge } from "primereact/badge";

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
      <div style={{ ...styles.container }}>
        <h3>Bet Slip</h3>
        {isMobile && (
          <div>
            <img
              src={notification}
              onClick={() => navigate("/notification")}
              style={{ cursor: "pointer" }}
            />
            <Badge
              value={notifications?.unreadCount}
              severity="danger"
              style={{ position: "relative", right: 8, bottom: 5 }}
            ></Badge>
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
                .reverse()
                .map((date) => (
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
                            <SlipCard
                              homeName={
                                item?.sportEvent?.FootballEvent?.localTeamName
                              }
                              awayName={
                                item?.sportEvent?.FootballEvent?.visitorTeamName
                              }
                              homeScore={
                                item?.sportEvent?.FootballEvent?.localTeamGoals
                              }
                              awayScore={
                                item?.sportEvent?.FootballEvent
                                  ?.visitorTeamGoals
                              }
                              homeImage={
                                item?.sportEvent?.FootballEvent?.localTeamLogo
                              }
                              awayImage={
                                item?.sportEvent?.FootballEvent?.visitorTeamLogo
                              }
                              isWin={item?.winnerId}
                              amount={item?.betAmount}
                              isUser={userData}
                              betCurrency={item?.betCurrency}
                              data={item}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
          </div>
        )}

        {active === "SETTLED" && (
          <div>
            {groupedData &&
              Object?.keys(groupedData)?.map((date) => (
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
                          <SlipCard
                            homeName={
                              item?.sportEvent?.FootballEvent?.localTeamName
                            }
                            awayName={
                              item?.sportEvent?.FootballEvent?.visitorTeamName
                            }
                            homeScore={
                              item?.sportEvent?.FootballEvent?.localTeamGoals
                            }
                            awayScore={
                              item?.sportEvent?.FootballEvent?.visitorTeamGoals
                            }
                            homeImage={
                              item?.sportEvent?.FootballEvent?.localTeamLogo
                            }
                            awayImage={
                              item?.sportEvent?.FootballEvent?.visitorTeamLogo
                            }
                            isWin={item?.winnerId}
                            amount={item?.betAmount}
                            isUser={userData}
                            betCurrency={item?.betCurrency}
                            data={item}
                          />
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
