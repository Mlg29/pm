import SearchInput from "../../../components/SearchComponent";
import heading from "../../../assets/images/heading.svg";
import { COLORS } from "../../../utils/colors";
import { FONTS } from "../../../utils/fonts";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosTennisball, IoMdFootball } from "react-icons/io";
import { FaBasketballBall } from "react-icons/fa";
import { MdSportsCricket, MdSportsRugby } from "react-icons/md";
import more from "../../../assets/images/more.svg";
import { FlexDirection } from "../../../utils/type";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import profile from "../../../assets/images/profile1.png";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import logout from "../../../assets/images/logout.svg";
import user1 from "../../../assets/images/user1.svg";
import LogOut from "../../../components/Modals/LogOut";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUserData } from "../../../redux/slices/AuthSlice";

import {
  getNotifications,
  notificationState,
} from "../../../redux/slices/NotificationSlice";
import { Sidebar } from "primereact/sidebar";
import asoccer from "../../../assets/images/asoccer.svg";
import insoccer from "../../../assets/images/insoccer.svg";
import abasketball from "../../../assets/images/basketball.svg";
import inbasketball from "../../../assets/images/inbasketball.svg";
import atennis from "../../../assets/images/tennis.svg";
import intennis from "../../../assets/images/intennis.svg";
import acricket from "../../../assets/images/cricket2.svg";
import incricket from "../../../assets/images/incricket2.svg";
import rugby from "../../../assets/images/rugby.svg";
import avolleyball from "../../../assets/images/volleyball.svg";
import involleyball from "../../../assets/images/involleyball.svg";
import formula from "../../../assets/images/formula.svg";
import abaseball from "../../../assets/images/baseball.svg";
import inbaseball from "../../../assets/images/inbaseball.svg";
import agolf from "../../../assets/images/golf.svg";
import ingolf from "../../../assets/images/ingolf.svg";
import ahorse from "../../../assets/images/horse.svg";
import inhorse from "../../../assets/images/inhorse.svg";
import ahockey from "../../../assets/images/hockey.svg";
import inhockey from "../../../assets/images/inhockey.svg";
import aussie from "../../../assets/images/aussie.svg";
import handball from "../../../assets/images/handball.svg";
import hockey from "../../../assets/images/icehockey.svg";
import nascar from "../../../assets/images/nascar.svg";
import futsol from "../../../assets/images/futsol.svg";
import boxing from "../../../assets/images/boxing.svg";
import ufc from "../../../assets/images/ufc.svg";
import dart from "../../../assets/images/dart.svg";
import snooker from "../../../assets/images/snooker.svg";
import easport from "../../../assets/images/easport.svg";
import tabletennis from "../../../assets/images/tabletennis.svg";

const styles = {
  rowBtw: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.semiGray}`,
    background: COLORS.white,
    padding: "0px 15rem",
  },
  rowBtwTab: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.semiGray}`,
    background: COLORS.white,
    padding: "0px 2rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  rowTab: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  rowBtwDes: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.semiGray}`,
    background: COLORS.white,
    padding: "0px 2rem",
  },
  rowDes: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "65%",
  },
};

function NavHeader() {
  const [selected, setSelected] = useState("Soccer");
  const location = useLocation();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const notifications = useAppSelector(notificationState) as any;
  const [visible, setVisible] = useState(false);
  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };
  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  useEffect(() => {
    var sport = localStorage.getItem("sport") || "Soccer";
    fetchUserInfo();
    getNotification();
    setSelected(sport);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const navigate = useNavigate();

  const itemList = [
    {
      id: 1,
      name: "Soccer",
      image: selected === "Soccer" ? asoccer : insoccer,
    },
    {
      id: 2,
      name: "Basketball",
      image: selected === "Basketball" ? abasketball : inbasketball,
    },
    {
      id: 3,
      name: "Tennis",
      image: selected === "Tennis" ? atennis : intennis,
    },
    {
      id: 4,
      name: "Horse Racing",
      image: selected === "Horse Racing" ? ahorse : inhorse,
    },
    {
      id: 5,
      name: "Boxing",
      image: boxing,
    },
    {
      id: 6,
      name: "MMA/UFC",
      image: ufc,
    },
    {
      id: 7,
      name: "Esport",
      image: easport,
    },
    {
      id: 10,
      name: "Golf",
      image: selected === "Golf" ? agolf : ingolf,
    },
    {
      id: 8,
      name: "Baseball",
      image: selected === "Baseball" ? abaseball : inbaseball,
    },
    {
      id: 11,
      name: "More",
      image: more,
    },
  ];

  const otherItemList = [
    {
      id: 1,
      name: "Formula 1",
      image: formula,
    },
    {
      id: 2,
      name: "American Football (Rugby)",
      image: rugby,
    },
    {
      id: 3,
      name: "Handball",
      image: handball,
    },
    {
      id: 4,
      name: "Ice Hockey",
      image: hockey,
    },
    {
      id: 5,
      name: "NASCAR",
      image: nascar,
    },
    {
      id: 6,
      name: "Futsol",
      image: futsol,
    },
    {
      id: 7,
      name: "Hockey",
      image: selected === "Hockey" ? ahockey : inhockey,
    },
    {
      id: 8,
      name: "Volleyball",
      image: selected === "Volleyball" ? avolleyball : involleyball,
    },
    {
      id: 9,
      name: "Darts",
      image: dart,
    },
    {
      id: 10,
      name: "Snooker",
      image: snooker,
    },
    {
      id: 11,
      name: "Cricket",
      image: selected === "Cricket" ? acricket : incricket,
    },
    {
      id: 12,
      name: "Table Tennis",
      image: tabletennis,
    },
    {
      id: 13,
      name: "Aussie Rules",
      image: aussie,
    },
  ];

  const handleMoreSelect = (data) => {
    localStorage.setItem("sport", data);
    window.dispatchEvent(new Event("localStorageUpdated"));
    setSelected(data);
    setVisible(false);
  };

  const handleSelection = (info) => {
    setSelected(info);
    localStorage.setItem("sport", info);
    window.dispatchEvent(new Event("localStorageUpdated"));
    navigate("/home");
  };

  return (
    <div>
      <LargScreen>
        <div style={{ ...styles.rowBtw }}>
          <img
            style={{ cursor: "pointer" }}
            src={heading}
            onClick={() => navigate("/home")}
          />
          {getToken && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  ...FONTS.body6,
                  marginRight: 10,
                  marginBottom: 0,
                  cursor: "pointer",
                  fontWeight:
                    location?.pathname === "/bet-slip" ? "600" : "400",
                }}
                onClick={() => navigate("/bet-slip")}
              >
                Bet History
              </h3>
              <h3
                style={{
                  ...FONTS.body6,
                  marginBottom: 0,
                  cursor: "pointer",
                  fontWeight:
                    location?.pathname === "/transaction" ? "600" : "400",
                }}
                onClick={() => navigate("/transaction")}
              >
                Transaction
              </h3>
            </div>
          )}
          <div style={{ ...styles.row }}>
            {getToken && <div style={{ width: "10%" }}></div>}
            <div style={{ width: "50%" }}>
              <SearchInput placeholder="Search by event, sport, club or game" />
            </div>

            {getToken ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/notification")}
                >
                  <div
                    style={{
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 15,
                      height: 15,
                      borderRadius: 100,
                      position: "absolute",
                    }}
                  >
                    <p style={{ fontSize: 8, color: "white" }}>
                      {notifications?.unreadCount}
                    </p>
                  </div>
                  <IoIosNotificationsOutline
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <Menu
                  menuButton={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        margin: "0px 1rem",
                      }}
                    >
                      {userData?.profileImage ? (
                        <img
                          src={userData?.profileImage}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      ) : (
                        <img
                          src={profile}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      )}

                      <div style={{ margin: "0px 0.5rem" }}>
                        <h3 style={{ ...FONTS.body7, margin: 0 }}>
                          {userData?.firstName} {userData?.lastName}
                        </h3>
                        <p style={{ ...FONTS.body7, fontSize: 10, margin: 0 }}>
                          @{userData?.userName}
                        </p>
                      </div>
                      <IoIosArrowDown />
                    </div>
                  }
                >
                  <div style={{ backgroundColor: "white", width: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/profile")}
                    >
                      <img src={user1} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Profile</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleShow()}
                    >
                      <img src={logout} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Log Out</p>
                    </div>
                  </div>
                </Menu>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: COLORS.cream,
                    padding: 16,
                    width: 150,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/login")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Log In
                  </p>
                </div>
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 16,
                    width: 180,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/sign-up")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      color: COLORS.white,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ ...styles.rowBtw }}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              margin: "10px 0px",
              scrollbarWidth: "none",
            }}
          >
            {itemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    display: "inline-block",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    info?.name === "More"
                      ? setVisible(true)
                      : handleSelection(info?.name)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      backgroundColor:
                        info?.name === selected
                          ? COLORS.primary
                          : "transparent",
                      borderRadius: "30px",
                      border: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />

                    <p
                      style={{
                        ...FONTS.h6,
                        color:
                          info?.name === selected
                            ? COLORS.white
                            : COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            {otherItemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      info?.name === selected ? COLORS.cream : "transparent",
                    borderRadius: "10px",
                    padding: "0px 5px",
                  }}
                  onClick={() => handleMoreSelect(info?.name)}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "15px 0px",

                      borderBottom: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />
                    <p
                      style={{
                        ...FONTS.h6,
                        color: COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </Sidebar>
        </div>
      </LargScreen>

      <Desktop>
        <div style={{ ...styles.rowBtwDes }}>
          <img
            style={{ cursor: "pointer" }}
            src={heading}
            onClick={() => navigate("/home")}
          />
          {getToken && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  ...FONTS.body6,
                  marginRight: 10,
                  marginBottom: 0,
                  cursor: "pointer",
                  fontWeight:
                    location?.pathname === "/bet-slip" ? "600" : "400",
                }}
                onClick={() => navigate("/bet-slip")}
              >
                Bet History
              </h3>
              <h3
                style={{
                  ...FONTS.body6,
                  fontWeight:
                    location?.pathname === "/transaction" ? "600" : "400",
                  marginBottom: 0,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/transaction")}
              >
                Transaction
              </h3>
            </div>
          )}
          <div style={{ ...styles.rowDes }}>
            {getToken && <div style={{ width: "10%" }}></div>}
            <div style={{ width: "50%" }}>
              <SearchInput placeholder="Search by event, sport, club or game" />
            </div>

            {getToken ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/notification")}
                >
                  <div
                    style={{
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 15,
                      height: 15,
                      borderRadius: 100,
                      position: "absolute",
                    }}
                  >
                    <p style={{ fontSize: 8, color: "white" }}>
                      {notifications?.unreadCount}
                    </p>
                  </div>
                  <IoIosNotificationsOutline
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Menu
                  menuButton={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        margin: "0px 1rem",
                      }}
                    >
                      {userData?.profileImage ? (
                        <img
                          src={userData?.profileImage}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      ) : (
                        <img
                          src={profile}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      )}
                      <div style={{ margin: "0px 0.5rem" }}>
                        <h3 style={{ ...FONTS.body7, margin: 0 }}>
                          {userData?.firstName} {userData?.lastName}
                        </h3>
                        <p style={{ ...FONTS.body7, fontSize: 10, margin: 0 }}>
                          @{userData?.userName}
                        </p>
                      </div>
                      <IoIosArrowDown />
                    </div>
                  }
                >
                  <div style={{ backgroundColor: "white", width: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/profile")}
                    >
                      <img src={user1} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Profile</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleShow()}
                    >
                      <img src={logout} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Log Out</p>
                    </div>
                  </div>
                </Menu>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: COLORS.cream,
                    padding: 16,
                    width: 150,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/login")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Log In
                  </p>
                </div>
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 16,
                    width: 180,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/sign-up")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      color: COLORS.white,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ ...styles.rowBtwDes }}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              margin: "10px 0px",
              scrollbarWidth: "none",
            }}
          >
            {itemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    display: "inline-block",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    info?.name === "More"
                      ? setVisible(true)
                      : handleSelection(info?.name)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      backgroundColor:
                        info?.name === selected
                          ? COLORS.primary
                          : "transparent",
                      borderRadius: "30px",
                      border: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />

                    <p
                      style={{
                        ...FONTS.h6,
                        color:
                          info?.name === selected
                            ? COLORS.white
                            : COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            {otherItemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      info?.name === selected ? COLORS.cream : "transparent",
                    borderRadius: "10px",
                    padding: "0px 5px",
                  }}
                  onClick={() => handleMoreSelect(info?.name)}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "15px 0px",

                      borderBottom: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />
                    <p
                      style={{
                        ...FONTS.h6,
                        color: COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </Sidebar>
        </div>
      </Desktop>

      <Tablet>
        <div style={{ ...styles.rowBtwTab }}>
          <img
            style={{ cursor: "pointer" }}
            src={heading}
            onClick={() => navigate("/home")}
          />
          {getToken && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3
                style={{
                  ...FONTS.body6,
                  marginRight: 10,
                  marginBottom: 0,
                  cursor: "pointer",
                  fontWeight:
                    location?.pathname === "/bet-slip" ? "600" : "400",
                }}
                onClick={() => navigate("/bet-slip")}
              >
                Bet History
              </h3>
              <h3
                style={{
                  ...FONTS.body6,
                  fontWeight:
                    location?.pathname === "/transaction" ? "600" : "400",
                  marginBottom: 0,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/transaction")}
              >
                Transaction
              </h3>
            </div>
          )}
          <div style={{ ...styles.rowTab }}>
            <div style={{ width: "30%" }}>
              <SearchInput placeholder="Search by event, sport, club or game" />
            </div>
            {getToken ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/notification")}
                >
                  <div
                    style={{
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 15,
                      height: 15,
                      borderRadius: 100,
                      position: "absolute",
                    }}
                  >
                    <p style={{ fontSize: 8, color: "white" }}>
                      {notifications?.unreadCount}
                    </p>
                  </div>
                  <IoIosNotificationsOutline
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <Menu
                  menuButton={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        margin: "0px 1rem",
                      }}
                    >
                      {userData?.profileImage ? (
                        <img
                          src={userData?.profileImage}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      ) : (
                        <img
                          src={profile}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                          }}
                          alt=""
                        />
                      )}
                      <div style={{ margin: "0px 0.5rem" }}>
                        <h3 style={{ ...FONTS.body7, margin: 0 }}>
                          {userData?.firstName} {userData?.lastName}
                        </h3>
                        <p style={{ ...FONTS.body7, fontSize: 10, margin: 0 }}>
                          @{userData?.userName}
                        </p>
                      </div>
                      <IoIosArrowDown />
                    </div>
                  }
                >
                  <div style={{ backgroundColor: "white", width: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/profile")}
                    >
                      <img src={user1} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Profile</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleShow()}
                    >
                      <img src={logout} />
                      <p style={{ ...FONTS.body6, marginLeft: 10 }}>Log Out</p>
                    </div>
                  </div>
                </Menu>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: COLORS.cream,
                    padding: 16,
                    width: 150,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/login")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Log In
                  </p>
                </div>
                <div
                  style={{
                    background: COLORS.primary,
                    padding: 16,
                    width: 180,
                    borderRadius: 10,
                  }}
                  onClick={() => navigate("/sign-up")}
                >
                  <p
                    style={{
                      ...FONTS.h6,
                      color: COLORS.white,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div style={{ ...styles.rowBtwTab }}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              margin: "10px 0px",
              scrollbarWidth: "none",
            }}
          >
            {itemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    display: "inline-block",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    info?.name === "More"
                      ? setVisible(true)
                      : handleSelection(info?.name)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "10px",
                      backgroundColor:
                        info?.name === selected
                          ? COLORS.primary
                          : "transparent",
                      borderRadius: "30px",
                      border: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />

                    <p
                      style={{
                        ...FONTS.h6,
                        color:
                          info?.name === selected
                            ? COLORS.white
                            : COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            {otherItemList?.map((info: any) => {
              return (
                <div
                  key={info?.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      info?.name === selected ? COLORS.cream : "transparent",
                    borderRadius: "10px",
                    padding: "0px 5px",
                  }}
                  onClick={() => handleMoreSelect(info?.name)}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "15px 0px",

                      borderBottom: `1px solid ${COLORS.semiGray}`,
                    }}
                  >
                    <img src={info?.image} />
                    <p
                      style={{
                        ...FONTS.h6,
                        color: COLORS.primary,
                        margin: "0px 5px",
                      }}
                    >
                      {info?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </Sidebar>
        </div>
      </Tablet>

      <LogOut show={show} handleClose={() => handleClose()} />
    </div>
  );
}

export default NavHeader;
