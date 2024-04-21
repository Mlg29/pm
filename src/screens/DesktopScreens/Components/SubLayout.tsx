import { Countries, Leagues } from "../../../utils/leagues";
import ads from "../../../assets/images/ads.svg";
import empty from "../../../assets/images/empty.svg";
import { COLORS } from "../../../utils/colors";
import SearchInput from "../../../components/SearchComponent";
import { FONTS } from "../../../utils/fonts";
import { FlexDirection } from "../../../utils/type";
import NavHeader from "./NavHeader";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import BetCard from "../../../components/BetCard";
import { useState } from "react";
import OpenBetLayout from "../../../components/OpenBetLayout";

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
    padding: 10,
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
function SubLayout({ children }) {
  const navigate = useNavigate();
  const [showBet, setShowBet] = useState(true)

  
  const LargScreen = ({ children }: any) => {
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
    <div>
      <NavHeader />
      <LargScreen>
        <div style={{ ...styles.container }}>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </LargScreen>

      <Desktop>
        <div style={{ ...styles.containerDes }}>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </Desktop>

      <Tablet>
        <div style={{ ...styles.containerTab }}>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </Tablet>
    </div>
  );
}

export default SubLayout;
