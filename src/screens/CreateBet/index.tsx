import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import { COLORS } from "../../utils/colors";
import { FlexDirection } from "../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";
import { BaseUrl } from "../../https";
import { io } from "socket.io-client";
import GameDetailCardHeader from "../../components/GameDetailCardHeader";
import TennisCard from "../../components/GameDetailCardHeader/TennisCard";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { useMediaQuery } from "react-responsive";

const styles = {
  contain: {
    padding: 15,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "10px 0px 20px 0px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    marginBottom: 20,
    padding: "15px 20px",
    borderRadius: 15,
  },
};

function CreateBet() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const game = location?.state?.game;
  const gameType = location?.state?.gameType;
  const [gameInfo, setGameInfo] = useState(null);
  const url = `${BaseUrl}/football`;



  useEffect(() => {
    setGameInfo(game);
    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("footballEventUpdate", (message) => {
      const mes = message;
      if (mes.id === game?.id) {
        setGameInfo(mes);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
  <div>
    {
        !isMobile && <DesktopBackButton />
      }
      <div className="top-container" style={{ backgroundColor: "white" }}>
      <Header text="Create Bet" />
      {
        gameType === "Soccer" &&  <GameDetailCardHeader data={gameInfo} />
      }
     
     {
      gameType === "Tennis" && <TennisCard data={gameInfo} />
     }

      <div>
        <h3 style={{ ...FONTS.h6 }}>Bet Option</h3>
        <p style={{ ...FONTS.body7, marginBottom: 20 }}>
          Select the option that best suit you
        </p>

      </div>

      <div style={{ ...styles.rowBtn, cursor: "pointer"  }}  onClick={() => navigate("/invite")}>
        <div
          style={{ display: "flex", alignItems: "center"}}
         
        >
          <div>
            <IoIosPeople
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Invite Friends</h3>
            <p style={{ ...FONTS.body7 }}>Create a bet invite</p>
          </div>
        </div>
        <FaChevronRight />
      </div>

      <div style={{ ...styles.rowBtn,cursor: "pointer"  }} onClick={() => navigate("/amount")}>
        <div
          style={{ display: "flex", alignItems: "center" }} 
        >
          <div>
            <RiFileList3Fill
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Open Bet</h3>
            <p style={{ ...FONTS.body7 }}>Creat bet in the bet market</p>
          </div>
        </div>
        <FaChevronRight />
      </div>
    </div>
  </div>
  );
}

export default CreateBet;
