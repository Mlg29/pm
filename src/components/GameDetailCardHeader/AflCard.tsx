import React from "react";
import { COLORS } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import noLogo from "../../assets/images/no.jpg";
import { FONTS } from "../../utils/fonts";
import { MdSportsRugby } from "react-icons/md";

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

function AflCard(props) {
  const navigate = useNavigate();
  const { propStyle, data } = props;





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
            AFL
          </p>

          <MdSportsRugby size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.localTeamName}
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
            {data?.localteam?.totalscore ? data?.localteam?.totalscore : 0} - {data?.hometeam?.totalscore ? data?.hometeam?.totalscore : 0}
          </h3>

          <p style={{ ...FONTS.body7, fontSize: "8px", textAlign: "center" }}>
            {data?.status === "Started" ? `${data?.time}'` : data?.status}
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

          <MdSportsRugby size={30} color={COLORS.primary} />
          <p
            style={{
              ...FONTS.body7,
              fontSize: "8px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {data?.visitorTeamName}
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

export default AflCard;
