import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { FaBasketball } from "react-icons/fa6";
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

function BasketballCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;

  // const localTime = convertToUserTime(data?.date, data?.time)

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
          <FaBasketball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamName || data?.localTeam?.name}
          </p>
        </div>
        <div>
          <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
              color: COLORS.dimRed
            }}
          >
            {data?.localTeam?.totalScore} - {data?.awayTeam?.totalScore}
          </h3>
          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {data?.status}
          </p>
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

          <FaBasketball size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeamName || data?.awayTeam?.name}
          </p>
        </div>
      </div>
      <div
        style={{
          height: 1,
          width: "100%",
          margin: "10px 0px",
          backgroundColor: COLORS.gray,
        }}
      />
      {/* <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{data?.localTeam?.name}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.ot ? data?.localTeam?.ot : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.q1 ? data?.localTeam?.q1 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.q2 ? data?.localTeam?.q2 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.q3 ? data?.localTeam?.q3 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.localTeam?.q4 ? data?.localTeam?.q4 : "-"}</p>
            <p style={{ margin: "0px 5px", color: 'red' }}>{data?.localTeam?.totalScore ? data?.localTeam?.totalScore : "-"}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <p>{data?.awayTeam?.name}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.ot ? data?.awayTeam?.ot : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.q1 ? data?.awayTeam?.q1 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.q2 ? data?.awayTeam?.q2 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.q3 ? data?.awayTeam?.q3 : "-"}</p>
            <p style={{ margin: "0px 5px" }}>{data?.awayTeam?.q4 ? data?.awayTeam?.q4 : "-"}</p>
            <p style={{ margin: "0px 5px", color: 'red' }}>{data?.awayTeam?.totalScore ? data?.awayTeam?.totalScore : "-"}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default BasketballCard;
