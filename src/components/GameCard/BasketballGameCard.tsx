import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import noLogo from "../../assets/images/no.jpg";
import { useNavigate } from "react-router-dom";
import { GiSoccerField } from "react-icons/gi";
import moment from "moment";

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
        <p style={{ ...FONTS.body8, color: COLORS.black }}>
         ( {moment(data?.startTime).format("DD-MM-YYYY")})
        </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status > 0 ? `${data?.status}'` : data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localTeamName}</p>
          <p style={{ ...FONTS.body7 }}>{data?.visitorTeamName}</p>
        </div>
        <div style={styles.box3}>
          {/* <GiSoccerField /> */}
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
              {data?.localTeamScores?.total
                ? data?.localTeamScores?.total
                : "-"}
            </p>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
              {data?.visitorTeamScores?.total
                ? data?.visitorTeamScores?.total
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketballGameCard;
