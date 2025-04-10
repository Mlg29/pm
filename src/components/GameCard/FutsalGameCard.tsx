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
    alignItems: "center",
    marginRight: 10,
    width: "10%",
  },
  box4: {
    marginRight: 10,
    width: "30%",
    display: 'flex',
    flexDirection: "column" as FlexDirection,
    alignItems: 'flex-end',
  },
};

function FutsalGameCard({ id, data }) {
  const navigate = useNavigate();
  const localTime = convertToUserTime(data?.date, data?.time)
  return (
    <div>


      <div
        style={styles.container}
        key={id}
        onClick={() =>
          navigate("/game-details", { state: { data: data, gameType: "Futsal" } })
        }
      >
        <div style={styles.box1}>
          <p style={{ ...FONTS.body8, fontSize: 10, fontWeight: 'bold', color: COLORS.black }}>
            ({data?.matchDate})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status === "Started" ? `${data?.time}'` : data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.localteam?.name}</p>
          <p style={{ ...FONTS.body7 }}>{data?.awayteam?.name}</p>
        </div>
        <div style={styles.box3}>
          {/* <GiSoccerField /> */}
          <div style={{ marginLeft: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>{data?.localteam?.goals ? data?.localteam?.goals : ""}</p>
            <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>{data?.awayteam?.goals ? data?.awayteam?.goals : ""}</p>


          </div>
        </div>

      </div>
    </div>

  );
}


export default FutsalGameCard;
