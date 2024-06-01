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
import { useLocation, useNavigate } from "react-router-dom";
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

function GameEventData(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const events = location.state.events;
  const eventType = location.state.type;

  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const footballEvents = useAppSelector(footballEventState) as any;
  // const footballFixtures = useAppSelector(footballFixtureState) as any
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const sliderArr = [slider, slider2, slider3];
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/football`;

  useEffect(() => {
    if (eventType === "live") {
      setLive(events);
    }

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
    const payloadToday = {
      startTime: moment(new Date()).format("YYYY-MM-DD"),
    };
    const payloadTomorrow = {
      startTime: tomorrowDate.format("YYYY-MM-DD"),
    };
    // dispatch(getFootballFixtures(payloadToday)).then(dd => {
    //   setToday(dd?.payload?.data)
    // })
    // dispatch(getFootballFixtures(payloadTomorrow)).then(dd => {
    //   setTomorrow(dd?.payload?.data)
    // })
    dispatch(getFootballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload);
    });
    // dispatch(getFootballEvents())
  }, []);

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

      {eventType === "live" && (
        <div>
          {live?.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  ...FONTS.body6,
                  color: COLORS.gray,
                  margin: "15px 0px",
                  textTransform: "uppercase",
                }}
              >
                {eventType}
              </p>
            </div>
          )}

          {live?.map((aa: any, i: any) => {
            return (
              <div key={i}>
                <GameCard id={i} data={aa} />
              </div>
            );
          })}
        </div>
      )}

      {eventType === "upcoming" && (
        <div>
          {upcoming?.data?.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  ...FONTS.body6,
                  color: COLORS.gray,
                  margin: "15px 0px",
                  textTransform: "uppercase"
                }}
              >
                {eventType}
              </p>
            </div>
          )}

          {upcoming?.data?.map((aa: any, i: any) => {
            return (
              <div key={i}>
                <GameCard id={i} data={aa} />
              </div>
            );
          })}
        </div>
      )}

      {getToken && <BottomTabs />}
    </div>
  );
}

export default GameEventData;
