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
import { IoMdCheckmarkCircle } from "react-icons/io";




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



  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  useEffect(() => {
    setLoader(true);
    dispatch(getBetById(id)).then((pp) => {
      setLoader(false);
      if (pp?.type === "bet/getBetById/rejected") {
        handleLogOut()
      }
      setBetData(pp?.payload);

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

  const getPrediction = (prediction: string) => {
    const result = betData?.sportEvent?.HorseEvent?.racerNames
      .filter((item, i) => prediction === `W${i + 1}`)
      .map((horse, i) => {
        return `${horse?.name} WIN`;
      });

    return result;
  };



  return (
    <div className="top-container">
      {
        isMobile ? null :
          <div style={{ marginTop: 10, cursor: "pointer" }} onClick={() => {
            navigate(-1)
          }}>
            <img src={arrowleft} style={{ padding: "10px", background: COLORS.semiGray, borderRadius: 100 }} />

          </div>
      }
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
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
              <p style={{ ...FONTS.body7 }}>Bet Created On</p>
              <h3 style={{ ...FONTS.h6 }}>
                {moment(betData?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </h3>
            </div>{" "}
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Stake</p>
              <h3 style={{ ...FONTS.h6 }}>
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black,
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.FootballEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`
                        : "DRAW"}
                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.FootballEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.FootballEvent?.visitorTeamName} Win`
                          : betData?.opponentPrediction === "DRAW"
                            ? "DRAW"
                            : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.TennisEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.TennisEvent?.visitorTeamName} Win`
                        : "N/A"}
                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.TennisEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.TennisEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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

      {sportType === "BASKETBALL" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <BasketballCard data={betData?.sportEvent?.BasketballEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.BasketballEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.BasketballEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.BasketballEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.BasketballEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{
                ...FONTS.h6
              }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>{getPrediction(betData?.prediction)}
                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>{getPrediction(betData?.opponentPrediction)}
                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.BoxingEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.BoxingEvent?.visitorTeamName} Win`
                        : "N/A"}
                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.BoxingEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.BoxingEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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

      {sportType === "ESPORT" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <EsportCard data={betData?.sportEvent?.EsportEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.EsportEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.EsportEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId === userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId !== userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.EsportEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.EsportEvent?.visitorTeamName} Win`
                          : "N/A"}
                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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
      {sportType === "DART" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <DartCard data={betData?.sportEvent?.DartEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.DartEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.DartEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.DartEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.DartEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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

      {sportType === "MMA" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <MmaCard data={betData?.sportEvent?.MmaEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.MmaEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.MmaEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.MmaEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.MmaEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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
      {sportType === "SNOOKER" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <SnookerCard data={betData?.sportEvent?.SnookerEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.SnookerEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.SnookerEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.SnookerEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.SnookerEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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

      {sportType === "VOLLYBALL" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <VolleyballCard data={betData?.sportEvent?.VollyBallEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.VollyBallEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.VollyBallEvent?.visitorTeamName} Win`
                        : "N/A"}
                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.VollyBallEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.VollyBallEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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
      {sportType === "HANDBALL" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <HandballCard data={betData?.sportEvent?.HandBallEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.HandBallEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.HandBallEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.HandBallEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.HandBallEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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
      {sportType === "AFL" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <AflCard data={betData?.sportEvent?.AflEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.AflEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.AflEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.AflEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.AflEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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

      {sportType === "FUTSAL" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <FutsalCard data={betData?.sportEvent?.FutsalEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.FutsalEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.FutsalEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }
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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId === userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.FutsalEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.FutsalEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }
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

      {sportType === "CRICKET" && (
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
            {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>

          <CricketCard data={betData?.sportEvent?.CricketEvent} />

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
                {userData?.defaultCurrency === "NGN" ? "₦" : "$"}{" "}
                {formatCurrency(
                  betData?.betAmount || betData?.opponentBetAmount
                )}
              </h3>
            </div>
            <div style={{ ...styles.cardDiv }}>
              <p style={{ ...FONTS.body7 }}>Your Prediction</p>
              <h3 style={{ ...FONTS.h6 }}>
                {betData?.userId === userData?.id ? (
                  <p style={{
                    color:
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? COLORS.green
                        : betData?.winnerId && betData?.winnerId !== userData?.id
                          ? COLORS.red
                          : COLORS.black
                  }}>
                    {betData?.prediction === "W1"
                      ? `${betData?.sportEvent?.CricketEvent?.localTeamName} Win`
                      : betData?.prediction === "W2"
                        ? `${betData?.sportEvent?.CricketEvent?.visitorTeamName} Win`
                        : "N/A"}

                    {
                      betData?.winnerId && betData?.winnerId === userData?.id
                        ? <IoMdCheckmarkCircle />
                        : null
                    }

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
                    <p style={{
                      color:
                        betData?.winnerId && betData?.winnerId === userData?.id
                          ? COLORS.green
                          : betData?.winnerId && betData?.winnerId !== userData?.id
                            ? COLORS.red
                            : COLORS.black
                    }}>
                      {betData?.opponentPrediction === "W1"
                        ? `${betData?.sportEvent?.CricketEvent?.localTeamName} Win`
                        : betData?.opponentPrediction === "W2"
                          ? `${betData?.sportEvent?.CricketEvent?.visitorTeamName} Win`
                          : "N/A"}

                      {
                        betData?.winnerId && betData?.winnerId !== userData?.id
                          ? <IoMdCheckmarkCircle />
                          : null
                      }

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
