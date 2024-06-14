import BottomTabs from "../../components/Tabs";
import notification from "../../assets/images/notification.svg";
import { RxAvatar } from "react-icons/rx";
import { FONTS } from "../../utils/fonts";
import SearchComponent from "../../components/SearchComponent";
import slider from "../../assets/images/slider.svg";
import slider2 from "../../assets/images/slider2.svg";
import slider3 from "../../assets/images/slider3.svg";
import more from "../../assets/images/more.svg";
import { IoMdFootball } from "react-icons/io";
import { MdSportsCricket } from "react-icons/md";
import { FaBasketballBall } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { MdSportsRugby } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import GameCard from "../../components/GameCard";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import heading from "../../assets/images/heading.svg";
import { BaseUrl } from "../../https";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserData } from "../../redux/slices/AuthSlice";
import {
  footballEventState,
  footballFixtureState,
  getFootballEvents,
  getFootballFixtures,
} from "../../redux/slices/FootballSlice";

import io from "socket.io-client";
import moment from "moment";
import Loader from "../../components/Loader";
import SliderComponent from "../../components/Slider";

function HomeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Soccer");
  // const [user, setUser] = useState(false)
  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);

  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/football`;

  useEffect(() => {
    const socket = io(url);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    // Handle incoming messages
    socket.on("footballEventUpdate", (message) => {
      setLive((prevMessages) => {
        const updatedMessages = prevMessages.filter(
          (msg) => msg.id !== message.id
        );
        return [...updatedMessages, message];
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const payloadUpcoming = {
      status: "UPCOMING",
    };
    const payloadLive = {
      status: "LIVE",
    };
    const payloadToday = {
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    const payloadTomorrow = {
      date: tomorrowDate.format("YYYY-MM-DD"),
    };
    dispatch(getFootballFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload?.data);
    });
    dispatch(getFootballFixtures(payloadToday)).then((dd) => {
      setToday(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadTomorrow)).then((dd) => {
      setTomorrow(dd?.payload);
    });
    dispatch(getFootballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
    // dispatch(getFootballEvents())
  }, []);

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

  const fetchUserInfo = async () => {
    setLoader(true);
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="top-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {getToken ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <RxAvatar size={50} />
            <h3 style={{ ...FONTS.h5, margin: "0px 5px" }}>
              Hi {userData?.firstName}
            </h3>
          </div>
        ) : (
          <img
            style={{ cursor: "pointer" }}
            src={heading}
            onClick={() => navigate("/home")}
          />
        )}

        {getToken ? (
          <img
            src={notification}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/notification")}
          />
        ) : (
          <RxAvatar
            size={50}
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      <SearchComponent placeholder="Search by event, sport, club or game" />

      <div style={{height: 150}}>
        <SliderComponent />
      </div>

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
              onClick={() => setSelected(info?.name)}
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  backgroundColor:
                    info?.name === selected ? COLORS.primary : "transparent",
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
                      info?.name === selected ? COLORS.white : COLORS.primary,
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
      {live?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            LIVE
          </p>
          {live?.length > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: live,
                    type: "live",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {live
        ?.filter((a, i) => i < 10)
        .map((aa: any, i: any) => {
          return (
            <div key={i}>
              <GameCard id={i} data={aa} />
            </div>
          );
        })}
      {upcoming?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            UPCOMING
          </p>
          {upcoming?.total > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: upcoming,
                    type: "upcoming",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {upcoming?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <GameCard id={i} data={aa} />
          </div>
        );
      })}

      {today?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            TODAY
          </p>
          {today?.total > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: today,
                    type: "today",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {today?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <GameCard id={i} data={aa} />
          </div>
        );
      })}

      {tomorrow?.data?.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
            TOMORROW
          </p>
          {tomorrow?.total > 10 && (
            <p
              style={{
                ...FONTS.body7,
                color: COLORS.orange,
                cursor: "pointer",
                margin: "15px 0px",
              }}
              onClick={() =>
                navigate("/events", {
                  state: {
                    events: tomorrow,
                    type: "tomorrow",
                  },
                })
              }
            >
              View more
            </p>
          )}
        </div>
      )}

      {tomorrow?.data?.map((aa: any, i: any) => {
        return (
          <div key={i}>
            <GameCard id={i} data={aa} />
          </div>
        );
      })}

      {getToken && <BottomTabs />}
    </div>
  );
}

export default HomeScreen;
