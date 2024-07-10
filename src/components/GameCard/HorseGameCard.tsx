import React from "react";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";

import { useNavigate } from "react-router-dom";


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
    // width: "45%",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    marginRight: 10,
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
        </div>
      </div>

      <div style={styles.box3}>
        {data?.horses?.horse?.map((dd, i) => {
          return (
            <div key={i} style={{ width: 200,  display: "flex",flexDirection: 'column',
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
              <div
                style={{
                  backgroundColor: COLORS.primary,
                  width: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    ...FONTS.body8,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  {dd["odds"]?.bookmaker?.odd}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HorseGameCard;
