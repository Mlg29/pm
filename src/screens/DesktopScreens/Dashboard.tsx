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
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch() as any;
  const sliderArr = [slider, slider2, slider3];
  const [loader, setLoader] = useState(false);
  const url = `${BaseUrl}/football`;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);


  const fetchUserInfo = async () => {
    setLoader(true)
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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


  if(loader){
    return <div style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, height: "100vh"}}>
      <Loader />
    </div>
  }

  return (
    <div style={{ ...styles.container }}>
      <DashboardLayout>
        <div>
         <SliderComponent />
          <div style={{ ...styles.div }}>
            <p
              style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}
            >
              LIVE
            </p>

            {live?.map((aa: any, i: any) => {
              return <GameCard key={i} data={aa} />;
            })}
            <p
              style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}
            >
              UPCOMING
            </p>

            {upcoming?.data?.map((aa: any, i: any) => {
              return <GameCard key={i} data={aa} />;
            })}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
