import GameCard from "../../components/GameCard";
import GameDetailCardHeader from "../../components/GameDetailCardHeader";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import user from "../../assets/images/user.svg";
import notification from "../../assets/images/notification.svg";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getBetById } from "../../redux/slices/BetSlice";
import { formatCurrency } from "../../utils/helper";
import moment from "moment";
import Loader from "../../components/Loader";
import { RxAvatar } from "react-icons/rx";
import { getUserData, userState } from "../../redux/slices/AuthSlice";
import Button from "../../components/Button";
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
import arrowleft from "../../assets/images/arrow-left.svg"
import { getFxRate } from "../../redux/slices/MiscSlice";
import BaseballCard from "../../components/GameDetailCardHeader/BaseballCard";
import NascarCardHeader from "../../components/GameDetailCardHeader/NascarCardHeader";



const styles = {
  div: {
    border: `1px solid ${COLORS.semiGray}`,
    padding: 10,
  },
  cardDiv: {
    padding: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  row: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
    padding: 15,
    borderRadius: 10,
    cursor: "pointer",
  },
};

function BetInviteDetail() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const betInfo = location?.state?.betInfo;
  const [betData, setBetData] = useState<any>();
  const id = location?.search?.replace("?", "");
  const [loader, setLoader] = useState(false);

  const [selected, setSelected] = useState("");
  const token = localStorage.getItem("token");
  const [exAmount, setExAmount] = useState<any>("")
  const [userData, setUserData] = useState(null);

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
    }

  };

  useEffect(() => {
    fetchUserInfo()
    setLoader(true);
    if (!token) {
      navigate("/login");
      localStorage.setItem("bet-invite-id", id);
      return;
    } else {
      dispatch(getBetById(id)).then(async (pp) => {
        setBetData(pp?.payload);
        await handleExRate(pp?.payload)
        setLoader(false);
      });
      localStorage.removeItem("bet-invite-id");
    }
  }, [id]);

  const
    handleRoute = (route: string, pred) => {
      setSelected(route);


      const payload = {
        invitedUser: null,
        amount: exAmount ? exAmount : (betData?.betAmount || betData?.opponentBetAmount),
        isAcceptBet: true,
        betId: betData?.id,
        sport: betData?.sportEvent?.sport,
        prediction: route,
      };
      localStorage.setItem("inviteeInfo", JSON.stringify(payload));
      return navigate("/options");
    };





  const handleExRate = async (data) => {
    const rateData = {
      sourceCurrency: data?.opponent?.defaultCurrency === "USD" ? "USD" : "NGN",
      destinationCurrency: data?.user?.defaultCurrency === "USD" ? "USD" : "NGN",
      amount: data?.opponentBetAmount
    }


    const newAmount = await dispatch(getFxRate(rateData)).then(pp => {

      const expectedAmount = pp?.payload?.data?.rate * data?.opponentBetAmount

      return expectedAmount
    })

    setExAmount(newAmount)


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
  console.log({ betData })
  return (
    <div className="top-container">
      {isMobile && <Header text="Bet Details" />}
      {
        isMobile ? null :
          <div style={{ marginTop: 10, cursor: "pointer" }} onClick={() => {
            navigate(-1)
          }}>
            <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />

          </div>
      }
      <p
        style={{
          ...FONTS.h5,
          textAlign: "center",
          margin: "0rem 0px 2rem 0px",
        }}
      >
        {betData?.status}
      </p>

      <p
        style={{
          ...FONTS.h2,
          textAlign: "center",
          color:
            betData?.winnerId && betData?.winnerId === userData?.id
              ? COLORS.green
              : betData?.winnerId && betData?.winnerId !== userData?.id
                ? COLORS.red
                : COLORS.gray,
          margin: "0px 0px 1rem 0px",
        }}
      >
        {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exAmount ? formatCurrency(exAmount) : formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
      </p>

      {betData?.sportEvent?.sport === "FOOTBALL" && (
        <GameDetailCardHeader
          data={betData?.sportEvent?.FootballEvent}
          propStyle={{ backgroundColor: COLORS.semiGray, padding: "20px 20px" }}
        />
      )}
      {betData?.sportEvent?.sport === "BASKETBALL" && (
        <BasketballCard data={betData?.sportEvent?.BasketballEvent} />
      )}
      {betData?.sportEvent?.sport === "TENNIS" && (
        <TennisCard data={betData?.sportEvent?.TennisEvent} />
      )}

      {betData?.sportEvent?.sport === "HORSE_RACING" && (
        <HorseCard gameInfo={betData?.sportEvent?.HorseEvent} />
      )}

      {betData?.sportEvent?.sport === "BOXING" && (
        <BoxingCard data={betData?.sportEvent?.BoxingEvent} />
      )}

      {betData?.sportEvent?.sport === "ESPORT" && (
        <EsportCard data={betData?.sportEvent?.EsportEvent} />
      )}

      {betData?.sportEvent?.sport === "DART" && (
        <DartCard data={betData?.sportEvent?.DartEvent} />
      )}
      {betData?.sportEvent?.sport === "SNOOKER" && (
        <SnookerCard data={betData?.sportEvent?.SnookerEvent} />
      )}

      {betData?.sportEvent?.sport === "VOLLYBALL" && (
        <VolleyballCard data={betData?.sportEvent?.VollyBallEvent} />
      )}

      {betData?.sportEvent?.sport === "HANDBALL" && (
        <HandballCard data={betData?.sportEvent?.HandBallEvent} />
      )}
      {betData?.sportEvent?.sport === "AFL" && (
        <AflCard data={betData?.sportEvent?.AflEvent} />
      )}
      {betData?.sportEvent?.sport === "MMA" && (
        <MmaCard data={betData?.sportEvent?.MmaEvent} />
      )}

      {betData?.sportEvent?.sport === "FUTSAL" && (
        <FutsalCard data={betData?.sportEvent?.FutsalEvent} />
      )}

      {betData?.sportEvent?.sport === "CRICKET" && (
        <CricketCard data={betData?.sportEvent?.CricketEvent} />
      )}

      {betData?.sportEvent?.sport === "BASEBALL" && (
        <BaseballCard data={betData?.sportEvent?.BaseballEvent} />
      )}

      {betData?.sportEvent?.sport === "NASCAR" && (
        <NascarCardHeader gameInfo={betData?.sportEvent?.NascarEvent} />
      )}

      <div style={{ ...styles.div }}>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Bet ID</p>
          <p style={{ ...FONTS.h6 }}>{betData?.id}</p>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Date & Time</p>
          <p style={{ ...FONTS.h6 }}>
            {moment(betData?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>{" "}
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Stake</p>
          <p style={{ ...FONTS.h6 }}>
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exAmount ? formatCurrency(exAmount) : formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </p>
        </div>
        {betData?.opponent ? (
          <div style={{ ...styles.cardDiv }}>
            <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
            {betData?.sportEvent?.sport === "HORSE_RACING" ? (

              <p>
                {betData?.opponentPrediction}
              </p>
            ) : betData?.sportEvent?.sport === "BASKETBALL" ? (
              <p style={{ ...FONTS.h6 }}>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction}
                  </p>
                ) : (
                  ""
                )}
              </p>
            ) :
              betData?.sportEvent?.sport === "NASCAR" ? (
                <p style={{ ...FONTS.h6 }}>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {betData?.opponentPrediction}
                    </p>
                  ) : (
                    ""
                  )}
                </p>
              )
                :
                betData?.sportEvent?.sport === "BASEBALL" ? (
                  <p style={{ ...FONTS.h6 }}>
                    {betData?.opponentId !== userData?.id ? (
                      <p>
                        {betData?.opponentPrediction}
                      </p>
                    ) : (
                      ""
                    )}
                  </p>
                )
                  : betData?.sportEvent?.sport === "TENNIS" ? (
                    <p style={{ ...FONTS.h6 }}>
                      {betData?.opponentId !== userData?.id ? (
                        <p>
                          {betData?.opponentPrediction}
                        </p>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : betData?.sportEvent?.sport === "FOOTBALL" ? (
                    <p>
                      {betData?.opponentId !== userData?.id ? (
                        <p>
                          {betData?.opponentPrediction}
                        </p>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : betData?.sportEvent?.sport === "BOXING" ? (
                    <p>
                      {betData?.opponentId !== userData?.id ? (
                        <p>
                          {betData?.opponentPrediction}
                        </p>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : betData?.sportEvent?.sport === "ESPORT" ? (
                    <p>
                      {betData?.opponentPrediction}
                    </p>
                  ) : betData?.sportEvent?.sport === "DART" ? (
                    <p>
                      {betData?.opponentPrediction}
                    </p>
                  )
                    : betData?.sportEvent?.sport === "MMA" ? (
                      <p>
                        {betData?.opponentPrediction}
                      </p>
                    ) :
                      betData?.sportEvent?.sport === "VOLLYBALL" ? (
                        <p>
                          {betData?.opponentPrediction}
                        </p>
                      ) :
                        betData?.sportEvent?.sport === "HANDBALL" ? (
                          <p>
                            {betData?.opponentPrediction}
                          </p>
                        ) :
                          betData?.sportEvent?.sport === "AFL" ? (
                            <p>
                              {betData?.opponentPrediction}
                            </p>
                          ) :
                            betData?.sportEvent?.sport === "FUTSAL" ? (
                              <p>
                                {betData?.opponentPrediction}
                              </p>
                            ) :
                              betData?.sportEvent?.sport === "CRICKET" ? (
                                <p>
                                  {betData?.opponentPrediction}
                                </p>
                              ) :
                                null}
          </div>
        ) : null}
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Opponent</p>
          {betData?.opponent ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ ...styles.row }}>
                {betData?.opponent?.profileImage ? (
                  <img
                    src={betData?.opponent?.profileImage}
                    style={{ width: 20, height: 20, borderRadius: 20 }}
                  />
                ) : (
                  <RxAvatar size={20} />
                )}

                <p style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>
                  @{betData?.opponent?.userName}
                </p>
              </div>
              {/* <img src={notification} /> */}
            </div>
          ) : (
            <p style={{ ...FONTS.h6, margin: "0px" }}>No opponent</p>
          )}
        </div>
      </div>
      {betData?.sportEvent?.sport === "HORSE_RACING" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          <div style={styles.div}>
            {betData?.sportEvent?.HorseEvent?.racerNames?.filter(pp => pp !== betData?.opponentPrediction).map((dd, i) => {
              return (
                <div
                  style={{
                    ...styles.card,
                    backgroundColor:
                      dd === betData?.opponentPrediction
                        ? COLORS.gray
                        : selected === dd
                          ? COLORS.primary
                          : COLORS.cream,
                    color:
                      selected === dd ? COLORS.cream : COLORS.primary,
                  }}
                  key={i}
                  onClick={() =>
                    dd === betData?.opponentPrediction
                      ? () => { }
                      : handleRoute(dd, `W${i + 1}`)
                  }
                >
                  <p style={{ ...FONTS.h6 }}>Bet {dd} to win</p>
                  {/* <p style={{ ...FONTS.body6 }}>{dd?.odds?.bookmaker?.odd}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {betData?.sportEvent?.sport === "TENNIS" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.TennisEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.TennisEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.TennisEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.TennisEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.TennisEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.TennisEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.TennisEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.TennisEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.TennisEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.TennisEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}
      {betData?.sportEvent?.sport === "BASKETBALL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.BasketballEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.BasketballEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BasketballEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BasketballEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BasketballEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.BasketballEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.BasketballEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BasketballEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BasketballEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BasketballEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "BOXING" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.BoxingEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.BoxingEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BoxingEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BoxingEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BoxingEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.BoxingEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.BoxingEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BoxingEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BoxingEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BoxingEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "ESPORT" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.EsportEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.EsportEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.EsportEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.EsportEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.EsportEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.EsportEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.EsportEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.EsportEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.EsportEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.EsportEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "DART" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.DartEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.DartEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.DartEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.DartEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.DartEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.DartEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.DartEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.DartEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.DartEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.DartEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "MMA" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.MmaEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.MmaEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.MmaEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.MmaEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.MmaEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.MmaEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.MmaEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.MmaEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.MmaEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.MmaEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "FOOTBALL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.FootballEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.FootballEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.FootballEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.FootballEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.FootballEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.FootballEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.FootballEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.FootballEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.FootballEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}

          {betData?.opponentPrediction !== "DRAW" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`DRAW`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected === "DRAW" ? COLORS.primary : COLORS.cream,
                  color: selected === "DRAW" ? COLORS.cream : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() => handleRoute("DRAW", "DRAW")}
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "SNOOKER" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.SnookerEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.SnookerEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.SnookerEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.SnookerEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.SnookerEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.SnookerEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.SnookerEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.SnookerEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.SnookerEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.SnookerEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "VOLLYBALL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.VollyballEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.VollyballEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.VollyballEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.VollyballEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.VollyballEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.VollyballEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.VollyballEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.VollyballEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.VollyballEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.VollyballEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "HANDBALL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.HandballEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.HandballEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.HandballEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.HandballEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.HandballEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.HandballEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.HandballEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.HandballEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.HandballEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.HandballEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "AFL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.AflEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.AflEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.AflEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.AflEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.AflEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.AflEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.AflEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.AflEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.AflEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.AflEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "FUTSAL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.FutsalEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.FutsalEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.FutsalEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.FutsalEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.FutsalEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.FutsalEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.FutsalEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.FutsalEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.FutsalEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.FutsalEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "CRICKET" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.CricketEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.CricketEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.CricketEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.CricketEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.CricketEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.CricketEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.CricketEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.CricketEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.CricketEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.CricketEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}

      {betData?.sportEvent?.sport === "NASCAR" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.NascarEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.NascarEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.NascarEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.NascarEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.NascarEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.NascarEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.NascarEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.NascarEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.NascarEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.NascarEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}


      {betData?.sportEvent?.sport === "BASEBALL" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== betData?.sportEvent?.BaseballEvent?.localTeamName && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.BaseballEvent?.localTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BaseballEvent?.localTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BaseballEvent?.localTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BaseballEvent?.localTeamName,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== betData?.sportEvent?.BaseballEvent?.visitorTeamName && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.BaseballEvent?.visitorTeamName} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                      betData?.sportEvent?.BaseballEvent?.visitorTeamName
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                      betData?.sportEvent?.BaseballEvent?.visitorTeamName
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BaseballEvent?.visitorTeamName,
                    "W2"
                  )
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BetInviteDetail;
