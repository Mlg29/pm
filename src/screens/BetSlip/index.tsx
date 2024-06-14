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
import { getUserData, loginState, userState } from "../../redux/slices/AuthSlice";

function BetSlip() {
  const navigate = useNavigate();
  const [active, setActive] = useState("ACTIVE");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userState)
  const [betList, setBetList] = useState<any>([]);

  useEffect(() => {
    dispatch(getUserData())
  }, [])


  useEffect(() => {
    const payload = {
      status: active === "ACTIVE" ? "PENDING" : active,
    };

    dispatch(getBetHistory(payload)).then((pp) => {
      setBetList(pp?.payload);
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



  return (
    <div className="top-container">
      <div style={{ ...styles.container }}>
        <h3>Bet Slip</h3>
        {isMobile && (
          <img src={notification} onClick={() => navigate("/notification")} />
        )}
      </div>
      <div style={{ ...styles.tabs }}>
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
            backgroundColor: active === "COMPLETED" ? COLORS.white : "transparent",
            cursor: "pointer",
          }}
          onClick={() => setActive("COMPLETED")}
        >
          <p style={{ ...FONTS.body6 }}>Completed</p>
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

      {active === "ACTIVE" && (
        <div>
          <div>
            {groupedData && Object?.keys(groupedData)
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
                    {groupedData[date].map((item, i) => {
                      return (
                        <div key={i}>
                          <SlipCard
                            homeName={item?.sportEvent?.FootballEvent?.localTeamName}
                            awayName={item?.sportEvent?.FootballEvent?.visitorTeamName}
                            homeScore={item?.sportEvent?.FootballEvent?.localTeamGoals}
                            awayScore={item?.sportEvent?.FootballEvent?.visitorTeamGoals}
                            homeImage={item?.sportEvent?.FootballEvent?.localTeamLogo}
                            awayImage={item?.sportEvent?.FootballEvent?.visitorTeamLogo}
                            isWin={item?.Winner}
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
        </div>
      )}

{active === "COMPLETED" && (
        <div>
          <div>
            {groupedData && Object?.keys(groupedData)
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
                    {groupedData[date].map((item, i) => {
                      return (
                        <div key={i}>
                          <SlipCard
                            homeName={item?.sportEvent?.FootballEvent?.localTeamName}
                            awayName={item?.sportEvent?.FootballEvent?.visitorTeamName}
                            homeScore={item?.sportEvent?.FootballEvent?.localTeamGoals}
                            awayScore={item?.sportEvent?.FootballEvent?.visitorTeamGoals}
                            homeImage={item?.sportEvent?.FootballEvent?.localTeamLogo}
                            awayImage={item?.sportEvent?.FootballEvent?.visitorTeamLogo}
                            isWin={item?.Winner}
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
        </div>
      )}

{active === "CANCELED" && (
        <div>
          <div>
            {groupedData && Object?.keys(groupedData)
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
                    {groupedData[date]?.map((item, i) => {
                      return (
                        <div key={i}>
                          <SlipCard
                            homeName={item?.sportEvent?.FootballEvent?.localTeamName}
                            awayName={item?.sportEvent?.FootballEvent?.visitorTeamName}
                            homeScore={item?.sportEvent?.FootballEvent?.localTeamGoals}
                            awayScore={item?.sportEvent?.FootballEvent?.visitorTeamGoals}
                            homeImage={item?.sportEvent?.FootballEvent?.localTeamLogo}
                            awayImage={item?.sportEvent?.FootballEvent?.visitorTeamLogo}
                            isWin={item?.Winner}
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
        </div>
      )}

      {/* {active === "opponent" && (
        <div>
          <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>
            TODAY
          </p>
          {["", "", "", "", "", "", ""]?.map((data, i) => {
            return (
              <div
                key={i}
                style={{ ...styles.rowBtw, cursor: "pointer" }}
                onClick={() => navigate("/opponent-detail")}
              >
                <div style={{ ...styles.row }}>
                  <img src={user} width={40} />
                  <h3 style={{ ...FONTS.h7, margin: "0px 0px 0px 5px" }}>
                    @JohnDdon2
                  </h3>
                </div>

                <div>
                  <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>
                    4 games
                  </h3>
                  <p
                    style={{
                      ...FONTS.body7,
                      margin: "2px 0px 0px 5px",
                      textAlign: "right",
                    }}
                  >
                    won 2
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )} */}
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
