import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import GameDetailCardHeader from "../../components/GameDetailCardHeader";
import Header from "../../components/Header";
import { COLORS } from "../../utils/colors";
import { useEffect, useRef, useState } from "react";
import { FONTS } from "../../utils/fonts";
import { FlexDirection, OverflowY, Position } from "../../utils/type";
import CardList from "../../components/CardList";
import AllTime from "../../components/CardList/AllTime";
import roma from "../../assets/images/roma.svg";
import milan from "../../assets/images/millan.svg";
import Formation from "../../components/Formation";
import { useMediaQuery } from "react-responsive";
import EmptyState from "../../components/EmptyState";
import { BaseUrl } from "../../https";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import { TbRectangleVerticalFilled } from "react-icons/tb";
import Loader from "../../components/Loader";
import TennisCard from "../../components/GameDetailCardHeader/TennisCard";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import HorseDetails from "./Details/HorseDetails";
import BoxingDetails from "./Details/BoxingDetails";
import MmaDetails from "./Details/MmaDetails";
import BasketballDetails from "./Details/BasketballDetails";
import EsportDetails from "./Details/EsportDetail";
import DartDetails from "./Details/DartDetail";

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
    width: "31%",
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
      ? `${BaseUrl}/tennis`
      : gameType === "Horse"
      ? `${BaseUrl}/horse`
      : `${BaseUrl}/football`;
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
    if (token) {
      setSelected(route);

      const payload = {
        userType: selection,
        sportEventId: gameInfo?.sportEventId,
        sportId: gameInfo?.id,
      };

      localStorage.setItem("userBetSelection", JSON.stringify(payload));

      setTimeout(() => {
        navigate(`/open-bets`, {
          state: { userSelection: payload, game: gameInfo, gameType: gameType },
        });
      }, 1000);
    } else {
      toast.error("You need to be logged in to proceed", {
        position: "bottom-center",
      });
    }
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
          <>
            <div
              style={{
                ...styles.btt,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <GameDetailCardHeader data={gameInfo} />

              <div style={{ ...styles.tabs }}>
                <div
                  style={{
                    ...styles.tb,
                    backgroundColor:
                      active === "stat" ? COLORS.white : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive("stat")}
                >
                  <p style={{ ...FONTS.body6 }}>STATS</p>
                </div>
                <div
                  style={{
                    ...styles.tb,
                    backgroundColor:
                      active === "lineup" ? COLORS.white : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive("lineup")}
                >
                  <p style={{ ...FONTS.body6 }}>LINEUPS</p>
                </div>
                <div
                  style={{
                    ...styles.tb,
                    backgroundColor:
                      active === "info" ? COLORS.white : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive("info")}
                >
                  <p style={{ ...FONTS.body6 }}>INFO</p>
                </div>
              </div>

              {gameInfo?.stats && Object.keys(gameInfo?.stats).length !== 0 ? (
                <div>
                  {active === "stat" && (
                    <div>
                      <CardList
                        header="Ball Possession"
                        homeText={
                          gameInfo?.stats?.localteam?.possestiontime["@total"]
                            ? gameInfo?.stats?.localteam?.possestiontime[
                                "@total"
                              ]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.possestiontime["@total"]
                            ? gameInfo?.stats?.visitorteam?.possestiontime[
                                "@total"
                              ]
                            : 0
                        }
                      />
                      <CardList
                        header="Off sides"
                        homeText={
                          gameInfo?.stats?.localteam?.offsides["@total"]
                            ? gameInfo?.stats?.localteam?.offsides["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.offsides["@total"]
                            ? gameInfo?.stats?.visitorteam?.offsides["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header="Shots"
                        homeText={
                          gameInfo?.stats?.localteam?.shots["@total"]
                            ? gameInfo?.stats?.localteam?.shots["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.shots["@total"]
                            ? gameInfo?.stats?.visitorteam?.shots["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header="Passes"
                        homeText={
                          gameInfo?.stats?.localteam?.passes["@total"]
                            ? gameInfo?.stats?.localteam?.passes["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.passes["@total"]
                            ? gameInfo?.stats?.visitorteam?.passes["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header="Fouls"
                        homeText={
                          gameInfo?.stats?.localteam?.fouls["@total"]
                            ? gameInfo?.stats?.localteam?.fouls["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.fouls["@total"]
                            ? gameInfo?.stats?.visitorteam?.fouls["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header={<TbRectangleVerticalFilled color="#FFC15E" />}
                        homeText={
                          gameInfo?.stats?.localteam?.yellowcards["@total"]
                            ? gameInfo?.stats?.localteam?.yellowcards["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.yellowcards["@total"]
                            ? gameInfo?.stats?.visitorteam?.yellowcards[
                                "@total"
                              ]
                            : 0
                        }
                      />
                      <CardList
                        header={<TbRectangleVerticalFilled color="red" />}
                        homeText={
                          gameInfo?.stats?.localteam?.redcards["@total"]
                            ? gameInfo?.stats?.localteam?.redcards["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.redcards["@total"]
                            ? gameInfo?.stats?.visitorteam?.redcards["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header="Corners"
                        homeText={
                          gameInfo?.stats?.localteam?.corners["@total"]
                            ? gameInfo?.stats?.localteam?.corners["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.corners["@total"]
                            ? gameInfo?.stats?.visitorteam?.corners["@total"]
                            : 0
                        }
                      />
                      <CardList
                        header="Saves"
                        homeText={
                          gameInfo?.stats?.localteam?.saves["@total"]
                            ? gameInfo?.stats?.localteam?.saves["@total"]
                            : 0
                        }
                        awayText={
                          gameInfo?.stats?.visitorteam?.saves["@total"]
                            ? gameInfo?.stats?.visitorteam?.saves["@total"]
                            : 0
                        }
                      />
                    </div>
                  )}

                  {active === "lineup" && (
                    <div style={{ backgroundColor: "#F3F3F3", marginTop: 10 }}>
                      <Formation
                        gameInfo={gameInfo}
                        homeTeamInfo={gameInfo?.lineup?.localteam}
                        awayTeamInfo={gameInfo?.lineup?.visitorteam}
                      />
                    </div>
                  )}

                  {active === "info" && (
                    // <div>
                    //   <div>
                    //     <h3
                    //       style={{
                    //         ...FONTS.h6,
                    //         textAlign: "center",
                    //         marginTop: "1rem",
                    //       }}
                    //     >
                    //       Last 5 Games
                    //     </h3>
                    //     <div style={{ ...styles.row }}>
                    //       <div>
                    //         <h3 style={{ ...FONTS.h5, color: COLORS.green }}>1</h3>
                    //         <p style={{ ...FONTS.body6, color: COLORS.green }}>
                    //           Millan
                    //         </p>
                    //       </div>
                    //       <div>
                    //         <h3
                    //           style={{
                    //             ...FONTS.h5,
                    //             color: COLORS.gray,
                    //             textAlign: "center",
                    //           }}
                    //         >
                    //           1
                    //         </h3>
                    //         <p
                    //           style={{
                    //             ...FONTS.body6,
                    //             color: COLORS.gray,
                    //             textAlign: "center",
                    //           }}
                    //         >
                    //           Draw
                    //         </p>
                    //       </div>
                    //       <div>
                    //         <h3
                    //           style={{
                    //             ...FONTS.h5,
                    //             color: COLORS.red,
                    //             textAlign: "right",
                    //           }}
                    //         >
                    //           3
                    //         </h3>
                    //         <p style={{ ...FONTS.body6, color: COLORS.red }}>
                    //           AS Roma
                    //         </p>
                    //       </div>
                    //     </div>
                    //     <div style={{ ...styles.row2 }}>
                    //       <div
                    //         style={{
                    //           width: "20%",
                    //           height: 5,
                    //           backgroundColor: COLORS.green,
                    //         }}
                    //       ></div>
                    //       <div
                    //         style={{
                    //           width: "20%",
                    //           height: 5,
                    //           backgroundColor: COLORS.gray,
                    //         }}
                    //       ></div>
                    //       <div
                    //         style={{
                    //           width: "60%",
                    //           height: 5,
                    //           backgroundColor: COLORS.red,
                    //         }}
                    //       ></div>
                    //     </div>
                    //   </div>
                    //   <h3
                    //     style={{
                    //       ...FONTS.h6,
                    //       textAlign: "center",
                    //       marginTop: "1rem",
                    //     }}
                    //   >
                    //     All last 5 games
                    //   </h3>
                    //   <AllTime
                    //     homeTeam="Milan"
                    //     awayTeam="As Roma"
                    //     homeImage={milan}
                    //     awayImage={roma}
                    //     homeLastFive={["W", "W", "D", "W", "W"]}
                    //     awayLastFive={["L", "W", "D", "W", "L"]}
                    //   />
                    // </div>
                    <div>
                      <div style={{ marginTop: "1rem" }}>
                        <h1 style={{ ...FONTS.h6, textAlign: "center" }}>
                          Attendance
                        </h1>
                        <p style={{ ...FONTS.body6, textAlign: "center" }}>
                          {gameInfo?.matchinfo?.attendance["@name"]}
                        </p>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <h1 style={{ ...FONTS.h6, textAlign: "center" }}>
                          Referee
                        </h1>
                        <p style={{ ...FONTS.body6, textAlign: "center" }}>
                          {gameInfo?.matchinfo?.referee["@name"]}
                        </p>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <h1 style={{ ...FONTS.h6, textAlign: "center" }}>
                          Stadium
                        </h1>
                        <p style={{ ...FONTS.body6, textAlign: "center" }}>
                          {gameInfo?.matchinfo?.stadium["@name"]}
                        </p>
                      </div>
                      <div style={{ marginTop: "1rem" }}>
                        <h1 style={{ ...FONTS.h6, textAlign: "center" }}>
                          Time
                        </h1>
                        <p style={{ ...FONTS.body6, textAlign: "center" }}>
                          {gameInfo?.matchinfo?.time["@name"]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ paddingTop: 50 }}>
                  <EmptyState height="100%" header="No Stat Available" />
                </div>
              )}


<div style={{ display: "flex", flexDirection: "column", marginBottom: '2rem'}}>
          {isMobile ? (
            <div style={{ ...styles.mob }}>
              <div style={{ width: "100%" }}>
                <Button
                  text={`Bet ${gameInfo?.localTeamName} Win`}
                  propStyle={{
                    width: "100%",
                    backgroundColor:
                      selected === gameInfo?.localTeamName
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.localTeamName
                        ? COLORS.cream
                        : COLORS.primary,
                  }}
                  handlePress={() => handleRoute(gameInfo?.localTeamName, "W1")}
                />
              </div>
              <div style={{ width: "100%", margin: "10px 0px" }}>
                <Button
                  text="Draw"
                  propStyle={{
                    width: "100%",
                    backgroundColor:
                      selected === "draw" ? COLORS.primary : COLORS.cream,
                    color: selected === "draw" ? COLORS.cream : COLORS.primary,
                  }}
                  //  handlePress={() => navigate('/home')}
                  handlePress={() => handleRoute("draw", "DRAW")}
                />
              </div>
              <div style={{ width: "100%", margin: "0px 0px 10px 0px" }}>
                <Button
                  text={`Bet ${gameInfo?.visitorTeamName} Win`}
                  propStyle={{
                    width: "100%",
                    backgroundColor:
                      selected === gameInfo?.visitorTeamName
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.visitorTeamName
                        ? COLORS.cream
                        : COLORS.primary,
                  }}
                  // handlePress={() => navigate('/home')}
                  handlePress={() =>
                    handleRoute(gameInfo?.visitorTeamName, "W2")
                  }
                />
              </div>
            </div>
          ) : (
            <div style={{ ...styles.desk }}>
              <div style={{ width: "100%" }}>
                <Button
                  text={`Bet ${gameInfo?.localTeamName} Win`}
                  propStyle={{
                    width: "90%",
                    backgroundColor:
                      selected === gameInfo?.localTeamName
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.localTeamName
                        ? COLORS.cream
                        : COLORS.primary,
                    fontSize: 12,
                  }}
                  handlePress={() => handleRoute(gameInfo?.localTeamName, "W1")}
                />
              </div>
              <div style={{ width: "100%", margin: "10px 0px" }}>
                <Button
                  text="Draw"
                  propStyle={{
                    width: "90%",
                    backgroundColor:
                      selected === "draw" ? COLORS.primary : COLORS.cream,
                    color: selected === "draw" ? COLORS.cream : COLORS.primary,
                    fontSize: 12,
                  }}
                  //  handlePress={() => navigate('/home')}
                  handlePress={() => handleRoute("draw", "DRAW")}
                />
              </div>
              <div style={{ width: "100%", margin: "10px 0px" }}>
                <Button
                  text={`Bet ${gameInfo?.visitorTeamName} Win`}
                  propStyle={{
                    width: "90%",
                    backgroundColor:
                      selected === gameInfo?.visitorTeamName
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.visitorTeamName
                        ? COLORS.cream
                        : COLORS.primary,
                    fontSize: 12,
                  }}
                  // handlePress={() => navigate('/home')}
                  handlePress={() =>
                    handleRoute(gameInfo?.visitorTeamName, "W2")
                  }
                />
              </div>
            </div>
          )}
        </div>
            </div>

            <ToastContainer />
          </>
        )}

        {gameType === "Tennis" && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                ...styles.btt,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <TennisCard data={gameInfo} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {isMobile ? (
                <div style={{ ...styles.mob }}>
                  <div style={{ width: "100%" }}>
                    <Button
                      text={`Bet ${gameInfo?.player[0]["@name"]} to Win`}
                      propStyle={{
                        width: "100%",
                        backgroundColor:
                          selected === gameInfo?.player[0]["@name"]
                            ? COLORS.primary
                            : COLORS.cream,
                        color:
                          selected === gameInfo?.player[0]["@name"]
                            ? COLORS.cream
                            : COLORS.primary,
                      }}
                      handlePress={() =>
                        handleRoute(gameInfo?.player[0]["@name"], "W1")
                      }
                    />
                  </div>
                  <div style={{ width: "100%", margin: "10px 0px" }}>
                    <Button
                      text={`Bet ${gameInfo?.player[1]["@name"]} to Win`}
                      propStyle={{
                        width: "100%",
                        backgroundColor:
                          selected === gameInfo?.player[1]["@name"]
                            ? COLORS.primary
                            : COLORS.cream,
                        color:
                          selected === gameInfo?.player[1]["@name"]
                            ? COLORS.cream
                            : COLORS.primary,
                      }}
                      // handlePress={() => navigate('/home')}
                      handlePress={() =>
                        handleRoute(gameInfo?.player[1]["@name"], "W2")
                      }
                    />
                  </div>
                </div>
              ) : (
                <div style={{ ...styles.desk }}>
                  <div style={{ width: "100%" }}>
                    <Button
                      text={`Bet ${gameInfo?.player[0]["@name"]} to Win`}
                      propStyle={{
                        width: "90%",
                        backgroundColor:
                          selected === gameInfo?.player[0]["@name"]
                            ? COLORS.primary
                            : COLORS.cream,
                        color:
                          selected === gameInfo?.player[0]["@name"]
                            ? COLORS.cream
                            : COLORS.primary,
                        fontSize: 12,
                      }}
                      handlePress={() =>
                        handleRoute(gameInfo?.player[0]["@name"], "W1")
                      }
                    />
                  </div>
                  <div style={{ width: "100%", margin: "10px 0px" }}>
                    <Button
                      text={`Bet ${gameInfo?.player[1]["@name"]} to Win`}
                      propStyle={{
                        width: "90%",
                        backgroundColor:
                          selected === gameInfo?.player[1]["@name"]
                            ? COLORS.primary
                            : COLORS.cream,
                        color:
                          selected === gameInfo?.player[1]["@name"]
                            ? COLORS.cream
                            : COLORS.primary,
                        fontSize: 12,
                      }}
                      // handlePress={() => navigate('/home')}
                      handlePress={() =>
                        handleRoute(gameInfo?.player[1]["@name"], "W2")
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
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


{gameType === "Esport" && (
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

        
      </div>

      <ToastContainer />
    </div>
  );
}

export default GameDetails;
