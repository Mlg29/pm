import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { BiSolidCricketBall } from "react-icons/bi";

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

function CricketCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;



  return (
    <div style={{ ...styles.container, ...propStyle }}>
      <p
        style={{
          ...FONTS.body7,
          margin: "0px 0px 10px 0px",
        }}
      >
        {data?.name || data?.league}
      </p>
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

          <BiSolidCricketBall size={30} color={COLORS.primary} />

          {/* <FaVolleyball size={30} color={COLORS.primary} /> */}
          <p
            style={{
              ...FONTS.body7,
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamName || data?.localTeam?.name}
          </p>
        </div>
        <div>
          {/* <h3
            style={{
              ...FONTS.h5,
              textAlign: "center",
              margin: "10px 0px 0px 0px",
              color: COLORS.dimRed
            }}
          >
            {data?.localteam?.goals ? data?.localteam?.goals : 0} - {data?.awayteam?.goals ? data?.awayteam?.goals : 0}
          </h3> */}

          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {data?.status === "Started" ? `${data?.dateTime}'` : data?.status}
          </p>
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

          <BiSolidCricketBall size={30} color={COLORS.primary} />

          <p
            style={{
              ...FONTS.body7,
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeamName || data?.visitorTeam?.name}
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

    </div>
  );
}

export default CricketCard;
