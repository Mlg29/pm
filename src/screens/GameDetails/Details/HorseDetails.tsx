import React from "react";
import { useMediaQuery } from "react-responsive";
import HorseCard from "../../../components/GameDetailCardHeader/HorseCard";
import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";

const styles = {
  div: {
    marginTop: "3rem",
  },
  card: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    margin: "10px 0px",
    padding: 15,
    borderRadius: 10,
    cursor: 'pointer'
  },
};

function HorseDetails({ selected, gameInfo, handleRoute }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });



  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1,padding: '0px 10px' }}>
      <HorseCard gameInfo={gameInfo} />
      <div style={styles.div}>
        {gameInfo?.horses?.horse?.map((dd, i) => {

          return (
            <div
              style={{
                ...styles.card,
                backgroundColor:
                  selected === dd?.name ? COLORS.primary : COLORS.cream,
                color: selected === dd?.name ? COLORS.cream : COLORS.primary,
              }}
              key={i}
              onClick={() => handleRoute(dd?.name, `W${i+1}`)}
            >
              <p style={{...FONTS.h6}}>Bet {dd?.name} to win</p>
              <p style={{...FONTS.body6}}>{dd?.odds?.bookmaker?.odd}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HorseDetails;
