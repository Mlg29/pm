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
import { userState } from "../../redux/slices/AuthSlice";
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
  const userData = useAppSelector(userState);
  const [selected, setSelected] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoader(true);
    if (!token) {
      navigate("/login");
      localStorage.setItem("bet-invite-id", id);
      return;
    } else {
      dispatch(getBetById(id)).then((pp) => {
        setBetData(pp?.payload);
        setLoader(false);
      });
      localStorage.removeItem("bet-invite-id");
    }
  }, [id]);

  const handleRoute = (route: string, pred) => {
    setSelected(route);


    const payload = {
      invitedUser: null,
      amount: betData?.betAmount || betData?.opponentBetAmount,
      isAcceptBet: true,
      betId: betData?.id,
      prediction: pred,
    };
    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
  };

  const getPrediction = (prediction: string) => {
    const result = betData?.sportEvent?.HorseEvent?.horses?.horse
      .filter((item, i) => prediction === `W${i + 1}`)
      .map((horse, i) => {
        return `${horse?.name}`;
      });

    return result;
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
      {isMobile && <Header text="Bet Details" />}

      <h3
        style={{
          ...FONTS.h5,
          textAlign: "center",
          margin: "0rem 0px 2rem 0px",
        }}
      >
        {betData?.status}
      </h3>

      <h3
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
        ₦{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
      </h3>

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
        <BoxingCard gameInfo={betData?.sportEvent?.BoxingEvent} />
      )}

{betData?.sportEvent?.sport === "ESPORT" && (
        <EsportCard gameInfo={betData?.sportEvent?.EsportEvent} />
      )}

{betData?.sportEvent?.sport === "DART" && (
        <DartCard gameInfo={betData?.sportEvent?.DartEvent} />
      )}
      {betData?.sportEvent?.sport === "SNOOKER" && (
        <SnookerCard gameInfo={betData?.sportEvent?.SnookerEvent} />
      )}

{betData?.sportEvent?.sport === "VOLLYBALL" && (
        <VolleyballCard gameInfo={betData?.sportEvent?.VollyBallEvent} />
      )}

{betData?.sportEvent?.sport === "HANDBALL" && (
        <HandballCard gameInfo={betData?.sportEvent?.HandBallEvent} />
      )}
      {betData?.sportEvent?.sport === "AFL" && (
        <AflCard gameInfo={betData?.sportEvent?.AflEvent} />
      )}
{betData?.sportEvent?.sport === "MMA" && (
        <MmaCard gameInfo={betData?.sportEvent?.MmaEvent} />
      )}

      <div style={{ ...styles.div }}>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Bet ID</p>
          <h3 style={{ ...FONTS.h6 }}>{betData?.id}</h3>
        </div>
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Date & Time</p>
          <h3 style={{ ...FONTS.h6 }}>
            {moment(betData?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </h3>
        </div>{" "}
        <div style={{ ...styles.cardDiv }}>
          <p style={{ ...FONTS.body7 }}>Stake</p>
          <h3 style={{ ...FONTS.h6 }}>
            ₦ {formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>
        </div>
        {betData?.opponent ? (
          <div style={{ ...styles.cardDiv }}>
            <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
            {betData?.sportEvent?.sport === "HORSE_RACING" ? (
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.opponentId !== userData?.id ? (
                  <p>{getPrediction(betData?.opponentPrediction)} WIN</p>
                ) : (
                  ""
                )}
              </h3>
            ): betData?.sportEvent?.sport === "BASKETBALL" ? (
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.BasketballEvent?.localTeamName} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.BasketballEvent?.visitorTeamName} Win`
                      : "DRAW"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            ) : betData?.sportEvent?.sport === "TENNIS" ? (
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.TennisEvent?.player[0]["@name"]} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.TennisEvent?.player[1]["@name"]} Win`
                      : "DRAW"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            ) : betData?.sportEvent?.sport === "FOOTBALL" ? (
              <h3>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.FootballEvent?.localTeamName} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`
                      : "DRAW"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            ) : betData?.sportEvent?.sport === "BOXING" ? (
              <h3>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.BoxingEvent?.localteam?.name} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.BoxingEvent?.awayteam?.name} Win`
                      : ""}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            ) : betData?.sportEvent?.sport === "ESPORT" ? (
              <h3>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.EsportEvent?.localteam?.name} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.EsportEvent?.awayteam?.name} Win`
                      : ""}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            ): betData?.sportEvent?.sport === "DART" ? (
              <h3>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.DartEvent?.localteam?.name} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.DartEvent?.awayteam?.name} Win`
                      : ""}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            )
            : betData?.sportEvent?.sport === "MMA" ? (
              <h3>
                {betData?.opponentId !== userData?.id ? (
                  <p>
                    {betData?.opponentPrediction === "W1"
                      ? `${betData?.sportEvent?.MmaEvent?.localteam?.name} Win`
                      : betData?.opponentPrediction === "W2"
                      ? `${betData?.sportEvent?.MmaEvent?.awayteam?.name} Win`
                      : ""}
                  </p>
                ) : (
                  ""
                )}
              </h3>) :
              betData?.sportEvent?.sport === "VOLLYBALL" ? (
                <h3>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.VollyballEvent?.localteam?.name} Win`
                        : betData?.opponentPrediction === "W2"
                        ? `${betData?.sportEvent?.VollyballEvent?.awayteam?.name} Win`
                        : ""}
                    </p>
                  ) : (
                    ""
                  )}
                </h3>) :
                betData?.sportEvent?.sport === "HANDBALL" ? (
                  <h3>
                    {betData?.opponentId !== userData?.id ? (
                      <p>
                        {betData?.opponentPrediction === "W1"
                          ? `${betData?.sportEvent?.HandballEvent?.localteam?.name} Win`
                          : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.HandballEvent?.awayteam?.name} Win`
                          : ""}
                      </p>
                    ) : (
                      ""
                    )}
                  </h3>) :
                  betData?.sportEvent?.sport === "AFL" ? (
                    <h3>
                      {betData?.opponentId !== userData?.id ? (
                        <p>
                          {betData?.opponentPrediction === "W1"
                            ? `${betData?.sportEvent?.AflEvent?.localteam?.name} Win`
                            : betData?.opponentPrediction === "W2"
                            ? `${betData?.sportEvent?.AflEvent?.awayteam?.name} Win`
                            : ""}
                        </p>
                      ) : (
                        ""
                      )}
                    </h3>) : null}
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

                <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>
                  @{betData?.opponent?.userName}
                </h3>
              </div>
              {/* <img src={notification} /> */}
            </div>
          ) : (
            <h3 style={{ ...FONTS.h6, margin: "0px" }}>No opponent</h3>
          )}
        </div>
      </div>
      {betData?.sportEvent?.sport === "HORSE_RACING" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          <div style={styles.div}>
            {betData?.sportEvent?.HorseEvent?.horses?.horse?.map((dd, i) => {
              return (
                <div
                  style={{
                    ...styles.card,
                    backgroundColor:
                      dd?.name === getPrediction(betData?.opponentPrediction)[0]
                        ? COLORS.gray
                        : selected === dd?.name
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === dd?.name ? COLORS.cream : COLORS.primary,
                  }}
                  key={i}
                  onClick={() =>
                    dd?.name === getPrediction(betData?.opponentPrediction)[0]
                      ? () => {}
                      : handleRoute(dd?.name, `W${i + 1}`)
                  }
                >
                  <p style={{ ...FONTS.h6 }}>Bet {dd?.name} to win</p>
                  <p style={{ ...FONTS.body6 }}>{dd?.odds?.bookmaker?.odd}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {betData?.sportEvent?.sport === "TENNIS" && (
        <div style={{ width: "100%", marginTop: 30 }}>
          <p>Select your prediction</p>
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.TennisEvent?.player[0]["@name"]} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.TennisEvent?.player[0]["@name"]
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.TennisEvent?.player[0]["@name"]
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.TennisEvent?.player[0]["@name"],
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.TennisEvent?.player[1]["@name"]} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.TennisEvent?.player[1]["@name"]
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.TennisEvent?.player[1]["@name"]
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.TennisEvent?.player[1]["@name"],
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
          {betData?.opponentPrediction !== "W1" && (
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
          {betData?.opponentPrediction !== "W2" && (
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.BoxingEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.BoxingEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.BoxingEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BoxingEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.BoxingEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.BoxingEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.BoxingEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.BoxingEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.EsportEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.EsportEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.EsportEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.EsportEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.EsportEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.EsportEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.EsportEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.EsportEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.DartEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.DartEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.DartEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.DartEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.DartEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.DartEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.DartEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.DartEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.MmaEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.MmaEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.MmaEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.MmaEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.MmaEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.MmaEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.MmaEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.MmaEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
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
          {betData?.opponentPrediction !== "W2" && (
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.SnookerEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.SnookerEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.SnookerEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.SnookerEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.SnookerEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.SnookerEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.SnookerEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.SnookerEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.VollyballEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.VollyballEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.VollyballEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.VollyballEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.VollyballEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.VollyballEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.VollyballEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.VollyballEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.HandballEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.HandballEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.HandballEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.HandballEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.HandballEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.HandballEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.HandballEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.HandballEvent?.awayteam?.name,
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
          {betData?.opponentPrediction !== "W1" && (
            <div style={{ width: "100%" }}>
              <Button
                text={`${betData?.sportEvent?.AflEvent?.localteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.AflEvent?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.AflEvent?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.AflEvent?.localteam?.name,
                    "W1"
                  )
                }
              />
            </div>
          )}
          {betData?.opponentPrediction !== "W2" && (
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`${betData?.sportEvent?.AflEvent?.awayteam?.name} Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected ===
                    betData?.sportEvent?.AflEvent?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected ===
                    betData?.sportEvent?.AflEvent?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(
                    betData?.sportEvent?.AflEvent?.awayteam?.name,
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
