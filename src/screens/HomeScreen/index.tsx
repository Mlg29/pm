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
import { getFootballFixtures } from "../../redux/slices/FootballSlice";

import io from "socket.io-client";
import moment from "moment";
import Loader from "../../components/Loader";
import SliderComponent from "../../components/Slider";
import {
  getNotifications,
  notificationState,
} from "../../redux/slices/NotificationSlice";

import { Sidebar } from 'primereact/sidebar';
        
import { Badge } from "primereact/badge";
import Football from "../Games/Football";
import Basketball from "../Games/Basketball";
import asoccer from "../../assets/images/asoccer.svg"
import insoccer from "../../assets/images/insoccer.svg"
import abasketball from "../../assets/images/basketball.svg"
import inbasketball from "../../assets/images/inbasketball.svg"
import atennis from "../../assets/images/tennis.svg"
import intennis from "../../assets/images/intennis.svg"
import acricket from "../../assets/images/cricket2.svg"
import incricket from "../../assets/images/incricket2.svg"
import rugby from "../../assets/images/rugby.svg"
import avolleyball from "../../assets/images/volleyball.svg"
import involleyball from "../../assets/images/involleyball.svg"
import formula from "../../assets/images/formula.svg"
import abaseball from "../../assets/images/baseball.svg"
import inbaseball from "../../assets/images/inbaseball.svg"
import agolf from "../../assets/images/golf.svg"
import ingolf from "../../assets/images/ingolf.svg"
import ahorse from "../../assets/images/horse.svg"
import inhorse from "../../assets/images/inhorse.svg"
import ahockey from "../../assets/images/hockey.svg"
import inhockey from "../../assets/images/inhockey.svg"
import aussie from "../../assets/images/aussie.svg"
import handball from "../../assets/images/handball.svg"
import hockey from "../../assets/images/icehockey.svg"
import nascar from "../../assets/images/nascar.svg"
import futsol from "../../assets/images/futsol.svg"
import boxing from "../../assets/images/boxing.svg"
import ufc from "../../assets/images/ufc.svg"
import dart from "../../assets/images/dart.svg"
import snooker from "../../assets/images/snooker.svg"
import easport from "../../assets/images/easport.svg"
import tabletennis from "../../assets/images/tabletennis.svg"
import Tennis from "../Games/Tennis";
import { getTennisFixtures } from "../../redux/slices/TennisSlice";






function HomeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Soccer");
  // const [user, setUser] = useState(false)
  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [upcomingTennis, setUpcomingTennis] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);
  const notifications = useAppSelector(notificationState) as any;
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/football`;
  const [visible, setVisible] = useState(false);

  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  useEffect(() => {
    getNotification();
    const socket = io(url) as any;

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
    socket.on("tennisEventUpdate", (message) => {
      console.log("tennis==", {message})
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
    const notYetPayloadUpcoming = {
      status: "Not Started"
    }

if(selected === "Soccer"){
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
  return;
}
    if(selected === "Tennis"){
      dispatch(getTennisFixtures(notYetPayloadUpcoming)).then((dd) => {
        setUpcomingTennis(dd?.payload);
       });
       return
    }
    
  }, [selected]);

  const itemList = [
    {
      id: 1,
      name: "Soccer",
      image: selected === "Soccer" ? asoccer : insoccer,
    },
    {
      id: 2,
      name: "Basketball",
      image: selected === "Basketball" ? abasketball : inbasketball
    },
    {
      id: 3,
      name: "Tennis",
      image:selected === "Tennis" ? atennis : intennis
    },
    {
      id: 4,
      name: "Cricket",
      image: selected === "Cricket" ? acricket : incricket
    },
    {
      id: 5,
      name: "Baseball",
      image: selected === "Baseball" ? abaseball : inbaseball
    },
    {
      id: 6,
      name: "Volleyball",
      image: selected === "Volleyball" ? avolleyball : involleyball
    },
    {
      id: 7,
      name: "Golf",
      image: selected === "Golf" ? agolf : ingolf
    },
    {
      id: 8,
      name: "Horse Racing",
      image: selected === "Horse Racing" ? ahorse : inhorse
    },
    {
      id: 9,
      name: "Hockey",
      image: selected === "Hockey" ? ahockey : inhockey
    },
    {
      id: 10,
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
      name: "Boxing",
      image: boxing,
    },
    {
      id: 8,
      name: "MMA/UFC",
      image: ufc,
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
      name: "Easport",
      image: easport,
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
  ]

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

  const handleMoreSelect = (data) => {
    setSelected(data)
    setVisible(false)
  }

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
          <div>
            <img
              src={notification}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/notification")}
            />
            <Badge
              value={notifications?.unreadCount}
              severity="danger"
              style={{ position: "relative", right: 8, bottom: 5 }}
            ></Badge>
          </div>
        ) : (
          <RxAvatar
            size={50}
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      <SearchComponent placeholder="Search by event, sport, club or game" />

      <div>
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
              onClick={() => info?.name === "More" ? setVisible(true) : setSelected(info?.name)}
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
                 <img src={info?.image} />
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
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
      {otherItemList?.map((info: any) => {
          return (
            <div
              key={info?.id}
              style={{
                cursor: "pointer",
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

      {selected === "Soccer" && (
        <div>
          <Football
            live={live}
            today={today}
            upcoming={upcoming}
            tomorrow={tomorrow}
          />
        </div>
      )}
      {selected === "Basketball" && <Basketball />}

      {selected === "Tennis" && <Tennis upcoming={upcomingTennis} />}

      {getToken && <BottomTabs />}
    </div>
  );
}

export default HomeScreen;
