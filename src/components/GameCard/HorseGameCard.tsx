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
    width: "20%",
  },
  box2: {
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    width: "50%",
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

  const utcDate = new Date(data?.datetimeUtc);
  const localTime = utcDate.toLocaleTimeString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div
      style={styles.container}
      key={id}
      onClick={() =>
        navigate("/game-details", { state: { data: data, gameType: "Horse" } })
      }
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={styles.box1}>
          <p style={{ ...FONTS.body8, fontSize: 8, fontWeight: 'bold', color: COLORS.black }}>
            ({data?.date} - {localTime})
          </p>
          <p style={{ ...FONTS.body7, color: COLORS.dimRed }}>
            {data?.status}
          </p>
        </div>
        <div style={styles.box2}>

          <p style={{ ...FONTS.body7 }}>{data?.name}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            width: '30%'
          }}
        >
          <p style={{ ...FONTS.body8 }}>
            <span style={{ color: COLORS.orange }}>Distance: </span>
          </p>
          <p style={{ ...FONTS.body8 }}>
            <span>{data?.distance}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HorseGameCard;
