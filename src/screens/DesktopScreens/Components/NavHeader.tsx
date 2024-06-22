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
import { useAppDispatch } from "../../../redux/hooks";
import { getUserData } from "../../../redux/slices/AuthSlice";

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


  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };

  useEffect(() => {
    fetchUserInfo();
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
      image: (
        <IoMdFootball
          size={20}
          color={selected === "Soccer" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 2,
      name: "Basketball",
      image: (
        <FaBasketballBall
          size={20}
          color={selected === "Basketball" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 3,
      name: "Tennis",
      image: (
        <IoIosTennisball
          size={20}
          color={selected === "Tennis" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 4,
      name: "Cricket",
      image: (
        <MdSportsCricket
          size={20}
          color={selected === "Cricket" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 5,
      name: "Rugby",
      image: (
        <MdSportsRugby
          size={20}
          color={selected === "Rugby" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 6,
      name: "Volleyball",
      image: (
        <MdSportsRugby
          size={20}
          color={selected === "Volleyball" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 7,
      name: "Formula 1",
      image: (
        <MdSportsRugby
          size={20}
          color={selected === "Formula 1" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 8,
      name: "Dog Race",
      image: (
        <MdSportsRugby
          size={20}
          color={selected === "Dog Race" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 9,
      name: "Horse Race",
      image: (
        <MdSportsRugby
          size={20}
          color={selected === "Horse Race" ? COLORS.white : COLORS.primary}
        />
      ),
    },
    {
      id: 10,
      name: "More",
      image: more,
    },
  ];

  const handleSelection = (info) => {
    setSelected(info)
    navigate('/home')
  }



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
               <div style={{cursor: "pointer"}} onClick={() => navigate("/notification")}>
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
                  onClick={() => handleSelection(info?.name)}
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
                    {info?.name === "More" ? (
                      <img src={info?.image} />
                    ) : (
                      info?.image
                    )}
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
                 <div style={{cursor: "pointer"}} onClick={() => navigate("/notification")}>
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
                  onClick={() => handleSelection(info?.name)}
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
                    {info?.name === "More" ? (
                      <img src={info?.image} />
                    ) : (
                      info?.image
                    )}
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
                 <div style={{cursor: "pointer"}} onClick={() => navigate("/notification")}>
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
                  onClick={() => handleSelection(info?.name)}
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
                    {info?.name === "More" ? (
                      <img src={info?.image} />
                    ) : (
                      info?.image
                    )}
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
        </div>
      </Tablet>

      <LogOut show={show} handleClose={() => handleClose()} />
    </div>
  );
}

export default NavHeader;
