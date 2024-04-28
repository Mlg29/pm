import React from "react";
import Header from "../../components/Header";
import user from "../../assets/images/user.svg";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import { COLORS } from "../../utils/colors";
import SlipCard from "../../components/SlipCard";
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import { useMediaQuery } from "react-responsive";

const styles = {
  row: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    cursor: "pointer",
    borderRadius: 10,
    color: COLORS.white,
    marginTop: 20,
  },
};

const OpponentDetail = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <div className="top-container">
      {
        isMobile && <Header text="Opponent Details" />
      }
      

      <div style={{ ...styles.row }}>
        <img src={user} width={50} />
        <h3 style={{ ...FONTS.h5, margin: "10px 0px 0px 5px" }}>@JohnDdon2</h3>

        <h3 style={{ ...styles.btn, ...FONTS.body7 }}>Share Bet History</h3>
      </div>

      <div>
        <p style={{ ...FONTS.h6, color: COLORS.gray, margin: "15px 0px" }}>
          BET HISTORY
        </p>

        <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>TODAY</p>
      <SlipCard
        homeName="Milan"
        awayName="AS Roma"
        homeScore={4}
        awayScore={1}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />

      <p style={{ ...FONTS.body7, color: COLORS.gray, margin: "15px 0px" }}>12/02/2024</p>
      <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={1}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="AS Roma"
        homeScore={2}
        awayScore={2}
        homeImage={milan}
        awayImage={roma}
        amount={"₦20,000"}
      />
       <SlipCard
        homeName="Juventus"
        awayName="Barcelona"
        homeScore={4}
        awayScore={3}
        homeImage={milan}
        awayImage={roma}
        isWin
        amount={"₦20,000"}
      />
      </div>
    </div>
  );
};

export default OpponentDetail;
