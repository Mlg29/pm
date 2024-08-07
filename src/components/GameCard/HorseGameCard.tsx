import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";

import { useNavigate } from "react-router-dom";
import { OverflowX } from "../../utils/type";
import moment from "moment";


type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    marginBottom: 20,
    cursor: "pointer",
    paddingBottom: 10,
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  box1: {
    marginRight: 20,
    // width: "30%",
  },
  box2: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',

    // width: "45%",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto" as OverflowX,
    whiteSpace: "nowrap",
    margin: "10px 0px",
   // scrollbarWidth: "none",
   // marginRight: 10,
    // width: "45%",
  },
};

function HorseGameCard({ id, data }) {
  const navigate = useNavigate();

  return (
    <div
      style={styles.container}
      key={id}
      onClick={() =>
        navigate("/game-details", { state: { data: data, gameType: "Horse" } })
      }
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <div style={styles.box1}>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status > 0 ? `${data?.status}'` : data?.status}
          </p>
        </div>
        <div style={styles.box2}>
          <p style={{ ...FONTS.body7 }}>{data?.name}</p>
          {/* <p style={{ ...FONTS.body8, color: COLORS.black, marginLeft: 10 }}>
         ( {moment(data?.startTime).format("DD-MM-YYYY")})
        </p> */}
        </div>
      </div>

      <div style={styles.box3}>
        {data?.horses?.horse?.map((dd, i) => {
          return (
            <div key={i} style={{ width: 200,  display: "inline-block",flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center", }}>
              <p
                style={{
                  ...FONTS.body8,
                  color: COLORS.primary,
                //   textAlign: "center",
                }}
              >
                {dd["jockey"].slice(0, 6)}
              </p>
              <p
                style={{
                  ...FONTS.body8,
                  color: COLORS.green,
                //   textAlign: "center",
                }}
              >
                WIN
              </p>
            
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HorseGameCard;
