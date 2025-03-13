import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import noLogo from "../../assets/images/no.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { awayLogoState, getLogo, getSecondLogo, homeLogoState } from "../../redux/slices/FootballSlice";
import { SportSportBaseUrl } from "../../https";
import { convertToUserTime } from "../../utils/helper";


type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    padding: 10,
    margin: "0px 0px 20px 0px",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    justifyContent: "space-between",
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0px 5px 0px",
  },
  box: {
    backgroundColor: COLORS.cream,
    width: "30%",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
  },
};

function GameDetailCardHeader(props: any) {
  const navigate = useNavigate();
  const { propStyle, data, homeLogo, awayLogo } = props;


  const dispatch = useAppDispatch() as any


  // console.log(">>", { data })
  //const localTime = convertToUserTime(data?.formattedDate, data?.time)

  return (
    <div style={{ ...styles.container, ...propStyle }}>
      <div style={{ ...styles.row }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "0px 0px 10px 0px",
            }}
          >
            {data?.league}
          </p>


          {!homeLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={`data:image/png;base64,${homeLogo}`} style={{ width: "20px" }} alt="Logo" />
          )}

          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeam?.name || data?.localTeamName}
          </p>
        </div>
        <div>
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              padding: "2px 5px",
              backgroundColor: COLORS.red,
              textAlign: "center",
              borderRadius: 10,
              color: COLORS.white,
            }}
          >
            {data?.winner === "Upcoming match" ? "Not started" : data?.status}
          </p>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeam?.goals === "?" ? null : data?.localTeam?.goals} - {data?.visitorTeam?.goals === "?" ? null : data?.visitorTeam?.goals}
          </h3>
          {/* <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {localTime}
          </p> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >

          {!awayLogo ? (
            <img src={noLogo} style={{ width: "30px" }} />
          ) : (
            <img src={`data:image/png;base64,${awayLogo}`} style={{ width: "20px" }} alt="Logo" />
          )}
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeam?.name || data?.visitorTeamName}
          </p>
        </div>
      </div>

    </div>
  );
}

export default GameDetailCardHeader;
