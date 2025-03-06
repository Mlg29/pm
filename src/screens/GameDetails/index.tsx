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
import BaseballDetails from "./Details/BaseBallDetails";
import NascarDetail from "./Details/NascarDetail";

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




  useEffect(() => {
    setLoader(true);
    setGameInfo(game);
    setTimeout(() => {
      setLoader(false);
    }, 1000);

  }, []);

  const utcDate = new Date(gameInfo?.datetimeUtc);
  const localTime = utcDate.toLocaleTimeString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });


  const handleRoute = (route: string, selection?: string) => {


    const name = gameInfo?.winner?.name || gameInfo?.winner

    const players = gameInfo?.runners?.map(dd => dd?.name) || gameInfo?.race?.results?.driver?.map(m => m?.name);

    if (gameInfo?.status === "Finished" || gameInfo?.internalStatus === "Finished" || gameInfo?.status === "Ended" || gameInfo?.status === "Final" || gameInfo?.status === "FT" || gameInfo?.["@status"] === "Finished" || gameInfo?.internalStatus === "Ended") {
      toast.error("Sorry, the game has ended, you can't proceed to bet on it", {
        position: "bottom-center",
      });
      return;
    }
    if (
      gameInfo?.status !== "upcoming" &&
      gameInfo?.status !== "Upcoming" &&
      gameInfo?.status !== "UPCOMING" &&
      gameInfo?.status !== "Not Started" &&
      gameInfo?.["@status"] !== "Not Started" &&
      name !== "Upcoming match"
    ) {
      toast.error("Sorry, the game is in progress, you can't proceed to bet on it", {
        position: "bottom-center",
      });
      return;
    }
    else if (token) {
      setSelected(route);

      const payload = {
        userType: route,
        sportEventId: gameInfo?.sportEventId,
        sportId: gameInfo?.id || gameInfo["@id"],
        sport: gameType === "Soccer" ? "FOOTBALL" : gameType === "Basketball" ? "BASKETBALL" : gameType === "Tennis" ? "TENNIS" : gameType === "Horse" ? "HORSE_RACING" : gameType?.toUpperCase() === "BOXING" ? "BOXING" : gameType?.toUpperCase() === "MMA/UFC" ? "MMA" : gameType === "Esports" ? "ESPORT" : gameType?.toUpperCase() === "FORMULA 1" ? "FORMULA_ONE" : gameType?.toUpperCase() === "AFL" ? "AMERICAN_FOOTBALL_LEAGUE" : gameType?.toUpperCase() === "CRICKET" ? "CRICKET" : gameType?.toUpperCase() === "NASCAR" ? "NASCAR" : gameType?.toUpperCase() === "BASEBALL" ? "BASEBALL" : gameType === "Aussie Rules" ? "AFL_AUSTRALIAN_RULES" : gameType?.toUpperCase(),
        matchEvent: {
          id: gameInfo?.id || gameInfo["@id"],
          sportEventId: gameInfo?.sportEventId,
          league: gameInfo?.league,
          leagueId: gameInfo?.leagueId,
          ...(gameInfo?.country !== undefined ? { country: gameInfo.country } : {}),
          // ...(gameInfo?.country !== undefined ? { country: gameInfo.country } : gameInfo?.league !== undefined ? { country: gameInfo.league } : {}),
          status: "Not Started",
          internalStatus: "UPCOMING",
          date: gameInfo?.formatted_date || gameInfo?.date || gameInfo["@date"],
          time: gameInfo?.time || gameInfo?.date || gameInfo["@time"],
          ...(gameType !== "Horse" && gameType !== "Formula1" && {
            localTeamName: gameInfo?.localTeam?.name || gameInfo?.localteam?.name || gameInfo?.player[0]?.name || gameInfo?.localTeam["@name"],
            visitorTeamName: gameInfo?.visitorTeam?.name || gameInfo?.visitorteam?.name || gameInfo?.awayTeam?.name || gameInfo?.player[1]?.name || gameInfo?.awayTeam["@name"],
          }),
          ...(gameType === "Horse" || gameType === "Formula1" ? { raceName: gameInfo?.name } : {}),
          ...(gameType === "Horse" || gameType === "Formula1" ? { racerNames: players } : {}),
          ...(gameType === "Golf" ? { sportName: gameType === "Soccer" ? "FOOTBALL" : gameType === "Basketball" ? "BASKETBALL" : gameType === "Tennis" ? "TENNIS" : gameType === "Horse" ? "HORSE_RACING" : gameType?.toUpperCase() === "BOXING" ? "BOXING" : gameType?.toUpperCase() === "MMA/UFC" ? "MMA" : gameType?.toUpperCase() === "FORMULA 1" ? "FORMULA_ONE" : gameType?.toUpperCase() === "AFL" ? "AMERICAN_FOOTBALL_LEAGUE" : gameType?.toUpperCase() === "CRICKET" ? "CRICKET" : gameType?.toUpperCase() === "NASCAR" ? "NASCAR" : gameType?.toUpperCase() === "BASEBALL" ? "BASEBALL" : gameType === "Aussie Rules" ? "AFL_AUSTRALIAN_RULES" : gameType?.toUpperCase() } : {}),
        }


      };


      //  console.log({ payload })
      // return

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
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
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
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Basketball" && (
          <BasketballDetails
            selected={selected}
            isMobile={isMobile}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Horse" && (
          <HorseDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Formula1" && (
          <Formula1Detail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Nascar" && (
          <NascarDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
          />
        )}

        {gameType === "Boxing" && (
          <BoxingDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Mma/Ufc" && (
          <MmaDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Esports" && (
          <EsportDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Dart" && (
          <DartDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Snooker" && (
          <SnookerDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Volleyball" && (
          <VolleyballDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Handball" && (
          <HandballDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}
        {gameType === "Baseball" && (
          <BaseballDetails
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "AFL" && (
          <AflDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Futsal" && (
          <FutsalDetail
            selected={selected}
            gameInfo={gameInfo}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
            handleRoute={(event, selection) => handleRoute(event, selection)}
            isMobile={isMobile}
          />
        )}

        {gameType === "Cricket" && (
          <CricketDetail
            selected={selected}
            dateTime={`${gameInfo?.formattedDate} - ${localTime}`}
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
