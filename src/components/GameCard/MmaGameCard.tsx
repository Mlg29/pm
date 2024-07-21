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
    width: "10%",
  },
  box2: {
    marginRight: 10,
    width: "55%",
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

function MmaGameCard({ id, data }) {
  const navigate = useNavigate();

  return (
    <div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 5}}> 
        <p style={{ ...FONTS.body7, color: COLORS.black, marginRight: 10 }}>
          {data?.name}
        </p>
        <p style={{ ...FONTS.body8, color: COLORS.black }}>
         ( {moment(data?.startTime).format("DD-MM-YYYY")})
        </p>
      </div>

        <div
      style={styles.container}
      key={id}
      onClick={() =>
        navigate("/game-details", { state: { data: data, gameType: "Mma/Ufc" } })
      }
    >
      <div style={styles.box1}>
        <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
          {data?.status > 0 ? `${data?.status}'` : data?.status}
        </p>
      </div>
      <div style={styles.box2}>
        <p style={{ ...FONTS.body7 }}>{data?.localteam?.name}</p>
        <p style={{ ...FONTS.body7 }}>{data?.awayteam?.name}</p>
      </div>
      <div style={styles.box3}>
        {/* <GiSoccerField /> */}
        <div style={{ marginLeft: 10 }}>
        <p style={{ ...FONTS.body7,color: COLORS.dimRed }}></p>
        <p style={{ ...FONTS.body7,color: COLORS.dimRed }}></p>
          

        </div>
      </div>
      <div style={styles.box4}>
        <p style={{ ...FONTS.body8, textAlign: "center", color: COLORS.green }}>
          {data?.localteam?.name} Win
        </p>
        <p style={{ ...FONTS.body8, textAlign: "center", color: COLORS.green }}>
          {data?.awayteam?.name} Win
        </p>
      </div>
    </div>
    </div>
  
  );
}


export default MmaGameCard;
