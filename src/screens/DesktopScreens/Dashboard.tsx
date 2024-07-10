import GameCard from "../../components/GameCard";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import DashboardLayout from "./Components/DashboardLayout";
import NavHeader from "./Components/NavHeader";
import slider from "../../assets/images/slider.svg";
import { useEffect, useMemo, useState } from "react";
import slider2 from "../../assets/images/slider2.svg";
import slider3 from "../../assets/images/slider3.svg";
import { BaseUrl } from "../../https";
import { useAppDispatch } from "../../redux/hooks";
import { io } from "socket.io-client";
import moment from "moment";
import { getFootballFixtures } from "../../redux/slices/FootballSlice";
import Loader from "../../components/Loader";
import { getUserData } from "../../redux/slices/AuthSlice";
import SliderComponent from "../../components/Slider";
import { useNavigate } from "react-router-dom";
import Football from "../Games/Football";
import Tennis from "../Games/Tennis";
import { getTennisFixtures } from "../../redux/slices/TennisSlice";
import { BsFilterSquareFill } from "react-icons/bs";
import HorseRace from "../Games/HorseRace";

const styles = {
  container: {
    background: COLORS.semiGray,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    flex: 1,
    height: "100%",
  },
  div: {
    backgroundColor: COLORS.white,
    padding: "10px 20px",
    borderRadius: 10,
    marginTop: "2rem",
  },
};

function Dashboard() {
  const dispatch = useAppDispatch() as any;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/football`;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [upcomingTennis, setUpcomingTennis] = useState<any>([]);
  const [liveTennis, setLiveTennis] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);
  const sportEvents = localStorage.getItem("sport") || "Soccer";

  const fetchUserInfo = async () => {
    setLoader(true);
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
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
      socket.on("TennisEventUpdate", (message) => {
        console.log("tennis==", { message });
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
    const notYetPayloadUpcoming = {
      status: "Not Started",
    };
    const tennisPayloadLive = {
      status: "Live",
    };

    if (sportEvents === "Soccer") {
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
    }
    if (sportEvents === "Tennis") {
      dispatch(getTennisFixtures(notYetPayloadUpcoming)).then((dd) => {
        setUpcomingTennis(dd?.payload);
      });
      dispatch(getTennisFixtures(tennisPayloadLive)).then((dd) => {
        setLiveTennis(dd?.payload);
      });
      return;
    }
  }, [sportEvents]);

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
    <div style={{ ...styles.container }}>
      <DashboardLayout>
        <div>
          <div>
            <SliderComponent />
          </div>

          <div style={{ ...styles.div }}>
            <div style={{ display: "flex", justifyContent: "flex-end", cursor: 'pointer' }} onClick={() => navigate("/filter")}>
              <BsFilterSquareFill size={20} />
            </div>
            {sportEvents && sportEvents === "Soccer" && (
              <Football
           
              />
            )}
            {sportEvents === "Tennis" && (
              <Tennis />
            )}

            {
              sportEvents === "Horse Racing" && (
                <HorseRace />
              )
            }
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
