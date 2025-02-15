import React from "react";
import { FlexDirection, OverflowX, Wrap } from "../../utils/type";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

const styles = {
  container: {},
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    alignItems: "center",
  },
  div: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: 'row' as FlexDirection,
    alignItems: "center",
    overflowX: 'auto' as OverflowX,
    whiteSpace: "nowrap"

  },
  card: {
    display: "flex",
    flexDirection: 'column' as FlexDirection,
    alignItems: "center",
    margin: "10px 10px",
    padding: 10,
    borderRadius: 10,
  },
};

function HorseCard({ gameInfo }) {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <p style={{ ...FONTS.h7 }}>{gameInfo?.league}</p>

      </div>

      <div style={styles.center}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
          <p style={{ ...FONTS.h7, textAlign: 'right', margin: '5px 1rem', width: '50%' }}>Status: </p>
          <p style={{ ...FONTS.h7, margin: '5px 0px', width: '50%', color: 'red' }}>{gameInfo?.status}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
          <p style={{ ...FONTS.h7, textAlign: 'right', margin: '5px 1rem', width: '50%' }}>Time: </p>
          <p style={{ ...FONTS.h7, margin: '5px 0px', width: '50%' }}>{gameInfo?.time}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
          <p style={{ ...FONTS.h7, textAlign: 'right', margin: '5px 1rem', width: '50%' }}>Distace: </p>
          <p style={{ ...FONTS.h7, margin: '5px 0px', width: '50%', color: 'green' }}>{gameInfo?.distance}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
          {/* <p style={{...FONTS.h7,textAlign: 'right', margin: '5px 1rem', width: '50%'}}> </p> */}
          <p style={{ ...FONTS.h7, margin: '5px 0px', width: '100%', textAlign: 'center', color: COLORS.orange }}>{gameInfo?.name}</p>
        </div>

      </div>


    </div>
  );
}

export default HorseCard;
