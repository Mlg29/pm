import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import GameDetailCardHeader from "../../../components/GameDetailCardHeader";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/colors";
import { useEffect, useRef, useState } from "react";
import { FONTS } from "../../../utils/fonts";
import { FlexDirection, OverflowY, Position } from "../../../utils/type";
import CardList from "../../../components/CardList";
import AllTime from "../../../components/CardList/AllTime";
import roma from "../../assets/images/roma.svg";
import milan from "../../assets/images/millan.svg";
import Formation from "../../../components/Formation";
import { useMediaQuery } from "react-responsive";
import EmptyState from "../../../components/EmptyState";
import { SportBaseUrl } from "../../../https";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import { TbRectangleVerticalFilled } from "react-icons/tb";
import Loader from "../../../components/Loader";
import TennisCard from "../../../components/GameDetailCardHeader/TennisCard";
import DesktopBackButton from "../../../components/BackButton/DesktopBackButton";
import HorseDetails from "./HorseDetails";
import BoxingCard from "../../../components/GameDetailCardHeader/BoxingCard";
import EsportCard from "../../../components/GameDetailCardHeader/EsportCard";




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
    padding: "0px 10px"
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


function EsportDetails({ gameInfo, isMobile, selected, handleRoute }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          ...styles.btt,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <EsportCard data={gameInfo} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isMobile ? (
          <div style={{ ...styles.mob }}>
            <div style={{ width: "100%" }}>
              <Button
                text={`Bet ${gameInfo?.localteam?.name} to Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected === gameInfo?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected === gameInfo?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                handlePress={() =>
                  handleRoute(gameInfo?.localteam?.name, 'W1')
                }
              />
            </div>
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`Bet ${gameInfo?.awayteam?.name} to Win`}
                propStyle={{
                  width: "100%",
                  backgroundColor:
                    selected === gameInfo?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected === gameInfo?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(gameInfo?.awayteam?.name, 'W2')
                }
              />
            </div>
          </div>
        ) : (
          <div style={{ ...styles.desk }}>
            <div style={{ width: "100%" }}>
              <Button
                text={`Bet ${gameInfo?.localteam?.name} to Win`}
                propStyle={{
                  width: "90%",
                  backgroundColor:
                    selected === gameInfo?.localteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected === gameInfo?.localteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                  fontSize: 12,
                }}
                handlePress={() =>
                  handleRoute(gameInfo?.localteam?.name, 'W1')
                }
              />
            </div>
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Button
                text={`Bet ${gameInfo?.awayteam?.name} to Win`}
                propStyle={{
                  width: "90%",
                  backgroundColor:
                    selected === gameInfo?.awayteam?.name
                      ? COLORS.primary
                      : COLORS.cream,
                  color:
                    selected === gameInfo?.awayteam?.name
                      ? COLORS.cream
                      : COLORS.primary,
                  fontSize: 12,
                }}
                // handlePress={() => navigate('/home')}
                handlePress={() =>
                  handleRoute(gameInfo?.awayteam?.name, 'W2')
                }
              />
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default EsportDetails
