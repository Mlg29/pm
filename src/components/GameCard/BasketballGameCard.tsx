import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import noLogo from "../../assets/images/no.jpg";
import { useNavigate } from "react-router-dom";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";
import { convertToUserTime } from "../../utils/helper";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    cursor: "pointer",
    paddingBottom: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  box1: {
    marginRight: 20,
    width: "20%",
  },
  box2: {
    marginRight: 10,
    width: "80%",
  },
  box3: {
    display: "flex",
    justifyContent: 'flex-end',
    alignItems: "center",
    marginRight: 10,
    width: "10%",
  },
  box4: {
    marginRight: 10,
    width: "30%",
    display: "flex",
    flexDirection: "column" as FlexDirection,
    alignItems: "flex-end",
  },
};

function BasketballGameCard({ id, data }) {
  const navigate = useNavigate();

  const utcDate = new Date(data?.datetimeUtc);
  const localTime = convertToUserTime(data?.date, data?.time)


  return (
    <div>
      <div
        style={styles.container}
        key={id}
        onClick={() =>
          navigate("/game-details", {
            state: { data: data, gameType: "Basketball" },
          })
        }
      >
        <div style={styles.box1}>
          <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
            ({localTime})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localTeam?.name}</p>
          <p style={{ ...FONTS.body7 }}>{data?.awayTeam?.name}</p>
        </div>
        <div style={styles.box3}>

          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.localTeam?.q1
                ? data?.localTeam?.q1
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.awayTeam?.q1
                ? data?.awayTeam?.q1
                : ""}
            </p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.localTeam?.q2
                ? data?.localTeam?.q2
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.awayTeam?.q2
                ? data?.awayTeam?.q2
                : ""}
            </p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.localTeam?.q3
                ? data?.localTeam?.q3
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.awayTeam?.q3
                ? data?.awayTeam?.q3
                : ""}
            </p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.localTeam?.q4
                ? data?.localTeam?.q4
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.awayTeam?.q4
                ? data?.awayTeam?.q4
                : ""}
            </p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.localTeam?.ot
                ? data?.localTeam?.ot
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.gray }}>
              {data?.awayTeam?.ot
                ? data?.awayTeam?.ot
                : ""}
            </p>
          </div>
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
              {data?.localTeam?.totalScore
                ? data?.localTeam?.totalScore
                : ""}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
              {data?.awayTeam?.totalScore
                ? data?.awayTeam?.totalScore
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketballGameCard;
