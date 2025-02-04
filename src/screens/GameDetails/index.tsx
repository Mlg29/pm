import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import GameDetailCardHeader from "../../components/GameDetailCardHeader";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { useEffect, useRef, useState } from "react";
import { FONTS } from "../../utils/fonts";
import { FlexDirection, OverflowY, Position, Wrap } from "../../utils/type";
import CardList from "../../components/CardList";
import AllTime from "../../components/CardList/AllTime";
import roma from "../../assets/images/roma.svg";
import milan from "../../assets/images/millan.svg";
import Formation from "../../components/Formation";
import { useMediaQuery } from "react-responsive";
import EmptyState from "../../components/EmptyState";
import { SportSportBaseUrl } from "../../https";
import { io } from "socket.io-client";
import { PiSoccerBallBold } from "react-icons/pi";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

import Loader from "../../components/Loader";
import TennisCard from "../../components/GameDetailCardHeader/TennisCard";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import HorseDetails from "./Details/HorseDetails";
import BoxingDetails from "./Details/BoxingDetails";
import MmaDetails from "./Details/MmaDetails";
import BasketballDetails from "./Details/BasketballDetails";
import EsportDetails from "./Details/EsportDetail";
import DartDetails from "./Details/DartDetail";
import SnookerDetail from "./Details/SnookerDetail";
import VolleyballDetail from "./Details/VolleyballDetail";
import HandballDetail from "./Details/HandballDetail";
import AflDetail from "./Details/AflDetail";
import FutsalDetail from "./Details/FutsalDetail";
import CricketDetail from "./Details/CricketDetail";
import FootballDetail from "./Details/FootballDetail";
import TennisDetail from "./Details/TennisDetail";
import Formula1Detail from "./Details/Formula1Detail";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    padding: "0px 20px",
    flex: 1,
    height: "100vh",
    backgroundColor: COLORS.white,
  },
  line: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px 0px 20px",
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  inactive: {
    backgroundColor: COLORS.semiGray,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.semiGray,
    borderRadius: "5px",
  },
  tb: {
    width: '30%',
    display: "flex",
    justifyContent: "center",
    padding: 10,
    margin: "5px",
    borderRadius: "5px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row2: {
    display: "flex",
    width: "100%",
    marginTop: "10px",
    alignItems: "center",
  },
  mob: {
    display: "flex",
    // zIndex: 11,
    flexDirection: "column" as FlexDirection,
    // flex: 2,
    justifyContent: "flex-start",
  },
  desk: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px",
  },
  container2: {
    position: "relative" as Position,
    display: "flex",
  },
  scrollable: {
    flex: 1,
    overflowY: "auto" as OverflowY,
    height: "300px",
    backgroundColor: "red",
  },
  fixed: {
    position: "absolute" as Position,
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  btt: {
    height: "200px",
    overflowY: "scroll" as OverflowY,
  },
};

function GameDetails() {
  const [active, setActive] = useState("stat");
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const game = location?.state?.data;
  const gameType = location?.state?.gameType;
  const [gameInfo, setGameInfo] = useState(null);

  const token = localStorage.getItem("token");
  const [loader, setLoader] = useState(false);



  const url =
    gameType === "Tennis"
      ? `${SportSportBaseUrl}/tennis`
      : gameType === "Horse"
        ? `${SportSportBaseUrl}/horse`
        : `${SportSportBaseUrl}/football`;
  const events =
    gameType === "Tennis"
      ? "tennisEventUpdate"
      : gameType === "Horse"
        ? "horseEventUpdate"
        : "footballEventUpdate";

  useEffect(() => {
    setLoader(true);
    setGameInfo(game);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on(events, (message) => {
      const mes = message;
      if (mes.id === game?.id) {
        setGameInfo(mes);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleRoute = (route: string, selection?: string) => {
    const name = gameInfo?.winner?.name || gameInfo?.winner

    if (gameInfo?.status === "Finished" || gameInfo?.internalStatus === "Finished" || gameInfo?.status === "Ended" || gameInfo?.status === "Final" || gameInfo?.status === "FT" || gameInfo?.internalStatus === "Ended") {
      toast.error("Sorry, the game has ended, you can't proceed to bet on it", {
        position: "bottom-center",
      });
      return;
    }
    if (name !== "Upcoming match") {
      toast.error("Sorry, the game is in progress, you can't proceed to bet on it", {
        position: "bottom-center",
      });
      return;
    }
    else if (token) {
      setSelected(route);

      const payload = {
        userType: selection,
        sportEventId: gameInfo?.sportEventId,
        sportId: gameInfo?.id,
        sport: gameType === "Soccer" ? "FOOTBALL" : gameType === "Basketball" ? "BASKETBALL" : gameType === "Tennis" ? "TENNIS" : gameType?.toUpperCase(),
        // matchEvent: gameInfo
        matchEvent: {
          id: gameInfo?.id,
          sportEventId: gameInfo?.sportEventId,
          league: gameInfo?.league,
          leagueId: gameInfo?.leagueId,
          country: gameInfo?.country,
          localTeamName: gameInfo?.localTeam?.name,
          visitorTeamName: gameInfo?.visitorTeam?.name,
          status: "Not Started",
          internalStatus: "UPCOMING",
          date: gameInfo?.formatted_date,
          time: gameInfo?.date,
        },
      };

      localStorage.setItem("userBetSelection", JSON.stringify(payload));

      setTimeout(() => {
        navigate(`/open-bets`, {
          state: { userSelection: payload, game: gameInfo, gameType: gameType },
        });
      }, 1000);
    } else {
      const db = {
        gameType,
        game
      }

      localStorage.setItem("gameDetail", JSON.stringify(db))

      toast.error("You need to be logged in to proceed", {
        position: "bottom-center",
      });
      setTimeout(() => {
        navigate("/login")
      }, 100)
    }
  };

  function isEmpty(value) {
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  const eventArray = isEmpty(gameInfo?.events)
    ? []
    : Array.isArray(gameInfo?.events)
      ? gameInfo?.events
      : gameInfo?.events

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
    <div className="top-container" style={{ backgroundColor: "transparent" }}>
      {!isMobile && <DesktopBackButton />}
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          flex: 1,
          paddingTop: !isMobile ? 10 : 0,
        }}
      >
        <Header text="Game Details" />

        {gameType === "Soccer" && (
          <FootballDetail
            selected={selected}
            isMobile={isMobile}
            gameInfo={gameInfo}
            active={active}
            setActive={setActive}
            styles={styles}
            eventArray={eventArray}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Tennis" && (
          <TennisDetail
            selected={selected}
            styles={styles}
            isMobile={isMobile}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Basketball" && (
          <BasketballDetails
            selected={selected}
            isMobile={isMobile}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Horse" && (
          <HorseDetails
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Formula1" && (
          <Formula1Detail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Boxing" && (
          <BoxingDetails
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Mma/Ufc" && (
          <MmaDetails
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Esports" && (
          <EsportDetails
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Dart" && (
          <DartDetails
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Snooker" && (
          <SnookerDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Volleyball" && (
          <VolleyballDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Handball" && (
          <HandballDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "AFL" && (
          <AflDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Futsal" && (
          <FutsalDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Cricket" && (
          <CricketDetail
            selected={selected}
            gameInfo={gameInfo}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

      </div>

      <ToastContainer />
    </div>
  );
}

export default GameDetails;
