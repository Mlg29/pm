import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { COLORS } from "../../utils/colors";
import { FlexDirection, OverflowY } from "../../utils/type";
import { FONTS } from "../../utils/fonts";
import ads from "../../assets/images/ads.svg";
import empty from "../../assets/images/empty.svg";
import BetCard from "../BetCard";

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
          <div style={{ ...styles.mini }}>
            <h3
              style={{
                ...FONTS.h5,
                ...styles.bg,
                margin: "0px",
                color: COLORS.white,
              }}
            >
              OPEN BET
            </h3>
            {!showBet ? (
              <div style={{ ...styles.sub }}>
                <img src={empty} />
                <p style={{ ...FONTS.body6, textAlign: "center" }}>
                  You haven’t select any option for this game. Available open
                  bet will be displayed here when you select an option.
                </p>
                <div
                  style={{
                    background: COLORS.lightGray,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p
                    style={{
                      ...FONTS.body6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Bet
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ ...styles.sub2 }}>
                <p style={{ ...FONTS.body7, margin: "10px 0px" }}>
                  Please select from the available open bets created by other
                  users that matches your options
                </p>
                {["", "", ""]?.map((aa) => {
                  return <BetCard />;
                })}
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                    color: COLORS.white,
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p
                    style={{
                      ...FONTS.body6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Bet
                  </p>
                </div>
              </div>
            )}
          </div>
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </LargeScreen>

      <Desktop>
        <div style={{ ...styles.box3 }}>
          <div style={{ ...styles.mini }}>
            <h3
              style={{
                ...FONTS.h5,
                ...styles.bg,
                margin: "0px",
                color: COLORS.white,
              }}
            >
              OPEN BET
            </h3>
            {!showBet ? (
              <div style={{ ...styles.sub }}>
                <img src={empty} />
                <p style={{ ...FONTS.body6, textAlign: "center" }}>
                  You haven’t select any option for this game. Available open
                  bet will be displayed here when you select an option.
                </p>
                <div
                  style={{
                    background: COLORS.lightGray,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p style={{ ...FONTS.body6, textAlign: "center" }}>
                    Create Bet
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ ...styles.sub2 }}>
                <p style={{ ...FONTS.body7, margin: "10px 0px" }}>
                  Please select from the available open bets created by other
                  users that matches your options
                </p>
                {["", "", ""]?.map((aa) => {
                  return <BetCard />;
                })}
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                    color: COLORS.white,
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p
                    style={{
                      ...FONTS.body6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Bet
                  </p>
                </div>
              </div>
            )}
          </div>
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </Desktop>

      <Tablet>
        <div style={{ ...styles.box3 }}>
          <div style={{ ...styles.mini }}>
            <h3
              style={{
                ...FONTS.h6,
                ...styles.bg,
                margin: "0px",
                color: COLORS.white,
              }}
            >
              OPEN BET
            </h3>
            {!showBet ? (
              <div style={{ ...styles.sub }}>
                <img src={empty} />
                <p style={{ ...FONTS.body7, textAlign: "center" }}>
                  You haven’t select any option for this game. Available open
                  bet will be displayed here when you select an option.
                </p>
                <div
                  style={{
                    background: COLORS.lightGray,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p style={{ ...FONTS.body6, textAlign: "center" }}>
                    Create Bet
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ ...styles.sub2 }}>
                <p style={{ ...FONTS.body7, margin: "10px 0px" }}>
                  Please select from the available open bets created by other
                  users that matches your options
                </p>
                {["", "", ""]?.map((aa) => {
                  return <BetCard />;
                })}
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                    width: "100%",
                    margin: "2rem 0px 0px 0px",
                    cursor: "pointer",
                    color: COLORS.white,
                  }}
                  //onClick={() => navigate("/open-bets")}
                >
                  <p
                    style={{
                      ...FONTS.body6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Bet
                  </p>
                </div>
              </div>
            )}
          </div>
          <img src={ads} style={{ width: "100%" }} />
        </div>
      </Tablet>
    </>
  );
};

export default OpenBetLayout;