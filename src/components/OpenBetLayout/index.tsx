import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { COLORS } from "../../utils/colors";
import { FlexDirection, OverflowY } from "../../utils/type";
import { FONTS } from "../../utils/fonts";
import ads from "../../assets/images/ads.svg";
import empty from "../../assets/images/empty.svg";
import BetCard from "../BetCard";
import CreateModal from "../Modals/CreateModal";

const styles = {
  container: {
    padding: "0px 15rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  containerDes: {
    padding: "0px 2rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  containerTab: {
    padding: "0px 2rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  box1: {
    width: "25%",
  },
  box2: {
    width: "70%",
    // background: COLORS.semiGray
  },
  box3: {
    width: "25%",
  },
  subBox: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: "1rem",
    borderRadius: 10,
  },
  sub: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sub2: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 10px",
    height: 400,
    overflowY: "scroll" as OverflowY,
  },
  mini: {
    border: `1px solid ${COLORS.gray}`,
    borderRadius: 10,
    marginBottom: 25,
  },
  bg: {
    backgroundColor: COLORS.primary,
    padding: "10px",
    borderRadius: "10px 10px 0px 0px",
    border: "none",
  },
};

const OpenBetLayout = () => {
  const [showBet, setShowBet] = useState(true);
  const [createBet, setCreateBet] = useState(false);

  const LargeScreen = ({ children }: any) => {
    const isLargeScreen = useMediaQuery({ minWidth: 1551 });
    return isLargeScreen ? children : null;
  };
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1550 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }: any) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };

  return (
    <>
      <LargeScreen>
        <div style={{ ...styles.box3 }}>

          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </LargeScreen>

      <Desktop>
        <div style={{ ...styles.box3 }}>

          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </Desktop>

      <Tablet>
        <div style={{ ...styles.box3 }}>

          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%", marginBottom: 10 }} />
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </Tablet>


      <CreateModal
        show={createBet}
        handleClose={() => setCreateBet(false)}
      />
    </>
  );
};

export default OpenBetLayout;
