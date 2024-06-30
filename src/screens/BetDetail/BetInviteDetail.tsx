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
    if(!token) {
        navigate('/login')
        localStorage.setItem("bet-invite-id", id)
        return;
    }
    else {
      dispatch(getBetById(id)).then((pp) => {
      setBetData(pp?.payload);
      setLoader(false);
    });   
    localStorage.removeItem('bet-invite-id')
    }
   
  }, [id]);

  const handleRoute = (route: string) => {
    setSelected(route);
    const payload = {
      invitedUser: null,
      amount: betData?.betAmount || betData?.opponentBetAmount,
      isAcceptBet: true,
      betId: betData?.id,
      prediction:
        route === betData?.sportEvent?.FootballEvent?.localTeamName
          ? "W1"
          : route === betData?.sportEvent?.FootballEvent?.visitorTeamName
          ? "W2"
          : "DRAW",
    };
    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options");
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

      <GameDetailCardHeader
        data={betData?.sportEvent?.FootballEvent}
        propStyle={{ backgroundColor: COLORS.semiGray, padding: "20px 20px" }}
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
            ₦ {formatCurrency(betData?.betAmount || betData?.opponentBetAmount)}
          </h3>
        </div>
        {/* <div style={{ ...styles.cardDiv }}>
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
        </div> */}
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
                    : "DRAW"}
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
      <div style={{ width: "100%", marginTop: 30 }}>
        <p>Select your prediction</p>
        {betData?.opponentPrediction !== "W1" && (
          <div style={{ width: "100%" }}>
            <Button
              text={`${betData?.sportEvent?.FootballEvent?.localTeamName} Win`}
              propStyle={{
                width: "100%",
                backgroundColor:
                  selected === betData?.sportEvent?.FootballEvent?.localTeamName
                    ? COLORS.primary
                    : COLORS.cream,
                color:
                  selected === betData?.sportEvent?.FootballEvent?.localTeamName
                    ? COLORS.cream
                    : COLORS.primary,
              }}
              handlePress={() =>
                handleRoute(betData?.sportEvent?.FootballEvent?.localTeamName)
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
                handleRoute(betData?.sportEvent?.FootballEvent?.visitorTeamName)
              }
            />
          </div>
        )}

        {betData?.opponentPrediction !== "DRAW" && (
          <div style={{ width: "100%", margin: "0px 0px 10px 0px" }}>
            <Button
              text="Draw"
              propStyle={{
                width: "100%",
                backgroundColor:
                  selected === "draw" ? COLORS.primary : COLORS.cream,
                color: selected === "draw" ? COLORS.cream : COLORS.primary,
              }}
              //  handlePress={() => navigate('/home')}
              handlePress={() => handleRoute("draw")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BetInviteDetail;
