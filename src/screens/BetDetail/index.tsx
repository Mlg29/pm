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
import TennisCard from "../../components/GameDetailCardHeader/TennisCard";
import HorseCard from "../../components/GameDetailCardHeader/HorseCard";
import BoxingCard from "../../components/GameDetailCardHeader/BoxingCard";

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
};

function BetDetail() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const betInfo = location?.state?.betInfo;
  const [betData, setBetData] = useState<any>();
  const id = location?.search?.replace("?", "");
  const [loader, setLoader] = useState(false);
  const userData = useAppSelector(userState);

  useEffect(() => {
    setLoader(true);
    dispatch(getBetById(id)).then((pp) => {
      setBetData(pp?.payload);
      setLoader(false);
    });
  }, [id]);

  const sportType = betData?.sportEvent?.sport;

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

  // console.log({ betData, sportType });
  const getPrediction = (prediction: string) => {
    const result = betData?.sportEvent?.HorseEvent?.horses?.horse
      .filter((item, i) => prediction === `W${i + 1}`)
      .map((horse, i) => {
        return `${horse?.name} WIN`;
      });

    return result;
  };

  return (
    <div className="top-container">
      {sportType === "FOOTBALL" && (
        <div>
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

          {betData?.winnerId && betData?.winnerId === userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Congratulations, You won the bet
            </p>
          ) : betData?.winnerId && betData?.winnerId !== userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Sorry, You lost the bet
            </p>
          ) : null}
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

          <GameDetailCardHeader
            data={betData?.sportEvent?.FootballEvent}
            propStyle={{
              backgroundColor: COLORS.semiGray,
              padding: "20px 20px",
            }}
          />

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
                ₦{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.FootballEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                      ? `${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`
                      : "DRAW"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            </div>
            {betData?.opponent ? (
              <div style={{ ...styles.cardDiv }}>
                <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
                <h3 style={{ ...FONTS.h6 }}>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.FootballEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                        ? `${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`
                        : betData?.opponentPrediction === "DRAW"
                        ? "DRAW"
                        : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                </h3>
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
        </div>
      )}

      {sportType === "TENNIS" && (
        <div>
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

          {betData?.winnerId && betData?.winnerId === userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Congratulations, You won the bet
            </p>
          ) : betData?.winnerId && betData?.winnerId !== userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Sorry, You lost the bet
            </p>
          ) : null}
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

          <TennisCard data={betData?.sportEvent?.TennisEvent} />

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
                ₦{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.TennisEvent?.player[0]["@name"]} Win`
                      : betData?.prediction === "W2"
                      ? `${betData?.sportEvent?.TennisEvent?.player[1]["@name"]} Win`
                      : "N/A"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            </div>
            {betData?.opponent ? (
              <div style={{ ...styles.cardDiv }}>
                <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
                <h3 style={{ ...FONTS.h6 }}>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.TennisEvent?.player[0]["@name"]} Win`
                        : betData?.opponentPrediction === "W2"
                        ? `${betData?.sportEvent?.TennisEvent?.player[1]["@name"]} Win`
                        : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                </h3>
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
        </div>
      )}

      {sportType === "HORSE_RACING" && (
        <div>
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

          {betData?.winnerId && betData?.winnerId === userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Congratulations, You won the bet
            </p>
          ) : betData?.winnerId && betData?.winnerId !== userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Sorry, You lost the bet
            </p>
          ) : null}
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

          <HorseCard gameInfo={betData?.sportEvent?.HorseEvent} />

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
                ₦{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p>
                    {getPrediction(betData?.prediction)}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            </div>
            {betData?.opponent ? (
              <div style={{ ...styles.cardDiv }}>
                <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
                <h3 style={{ ...FONTS.h6 }}>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {getPrediction(betData?.opponentPrediction)}
                    </p>
                  ) : (
                    ""
                  )}
                </h3>
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
        </div>
      )}

{sportType === "BOXING" && (
        <div>
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

          {betData?.winnerId && betData?.winnerId === userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Congratulations, You won the bet
            </p>
          ) : betData?.winnerId && betData?.winnerId !== userData?.id ? (
            <p
              style={{
                ...FONTS.body7,
                textAlign: "center",
                margin: "0rem 0px 2rem 0px",
              }}
            >
              Sorry, You lost the bet
            </p>
          ) : null}
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

          <BoxingCard data={betData?.sportEvent?.BoxingEvent} />

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
                ₦{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.BoxingEvent?.localteam?.name} Win`
                      : betData?.prediction === "W2"
                      ? `${betData?.sportEvent?.BoxingEvent?.awayteam?.name} Win`
                      : "N/A"}
                  </p>
                ) : (
                  ""
                )}
              </h3>
            </div>
            {betData?.opponent ? (
              <div style={{ ...styles.cardDiv }}>
                <p style={{ ...FONTS.body7 }}>Opponent Prediction</p>
                <h3 style={{ ...FONTS.h6 }}>
                  {betData?.opponentId !== userData?.id ? (
                    <p>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.BoxingEvent?.localteam?.name} Win`
                        : betData?.opponentPrediction === "W2"
                        ? `${betData?.sportEvent?.BoxingEvent?.awayteam?.name} Win`
                        : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                </h3>
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
        </div>
      )}
    </div>
  );
}

export default BetDetail;
