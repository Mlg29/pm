import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import arrowRight from "../../assets/images/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { FlexDirection, Position } from "../../utils/type";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import NoGamesModal from "../../components/Modals/NoGamesModal";
import MaxModal from "../../components/Modals/MaxModal";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    flex: 1,
    height: "100%",
    padding: "16px",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px",
  },
  row: {
    width: "100%",
  },
  trash: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0px",
  },
  edit: {
    position: "relative" as Position,
    bottom: 20,
    left: 20,
  },
};

function Restrictions() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [showMax, setShowMax] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const handleGameClose = () => {
    setShowGame(false)
  }

  const handleMaxClose = () => {
    setShowMax(false)
  }


  return (
    <div style={{ ...styles.container }}>
      {isMobile && <Header text="Restrictions" />}

      <p style={{ ...FONTS.body6 }}>
        Bet responsibly by placing restrictions on your bet choices.
      </p>

      <div style={{cursor: "pointer"}} onClick={() =>isMobile ? navigate("/maximum") : setShowMax(true)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ ...FONTS.h6, marginTop: "20px" }}>Maximum amount</h3>
          <img src={arrowRight} />
        </div>
        <p style={{ ...FONTS.body6 }}>
          Set your maximum transaction amount per bet to stay in control and bet
          responsibly.
        </p>
      </div>
      <div
        style={{
          height: "2px",
          backgroundColor: COLORS.lightGray,
          marginTop: "20px",
        }}
      />
      <div style={{cursor: "pointer"}} onClick={() => isMobile ? navigate("/num-of-games") : setShowGame(true)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ ...FONTS.h6, marginTop: "20px" }}>Number of games</h3>
          <img src={arrowRight} />
        </div>
        <p style={{ ...FONTS.body6 }}>
          Choose the number of games you want to participate in to stay in
          control and bet responsibly
        </p>
      </div>


      <NoGamesModal 
        show={showGame}
        handleClose={handleGameClose}
      />

      <MaxModal 
        show={showMax}
        handleClose={handleMaxClose}
      />
    </div>
  );
}

export default Restrictions;
