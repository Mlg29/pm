import GameCard from "../../components/GameCard";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { FlexDirection } from "../../utils/type";
import DashboardLayout from "./Components/DashboardLayout";
import NavHeader from "./Components/NavHeader";
import slider from "../../assets/images/slider.svg";
import { forwardRef, useEffect, useMemo, useState } from "react";
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
import Boxing from "../Games/Boxing";
import Basketball from "../Games/Basketball";
import Baseball from "../Games/BaseBall";
import Volleyball from "../Games/Volleyball";
import Golf from "../Games/Golf";
import Hockey from "../Games/Hockey";
import Formula1 from "../Games/Formula1";
import Rugby from "../Games/Rugby";
import Handball from "../Games/Handball";
import IceHockey from "../Games/IceHockey";
import Nascar from "../Games/Nascar";
import Futsol from "../Games/Futsol";
import Mma from "../Games/Mma";
import Darts from "../Games/Darts";
import Snooker from "../Games/Snooker";
import Easport from "../Games/Easport";
import TableTennis from "../Games/TableTennis";
import AussieRules from "../Games/AussieRules";
import Cricket from "../Games/Cricket";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [loader, setLoader] = useState(true);
  const url = `${BaseUrl}/football`;
  const [live, setLive] = useState<any>([]);
  const [upcoming, setUpcoming] = useState<any>([]);
  const [upcomingTennis, setUpcomingTennis] = useState<any>([]);
  const [liveTennis, setLiveTennis] = useState<any>([]);
  const [today, setToday] = useState<any>([]);
  const [tomorrow, setTomorrow] = useState<any>([]);
  const [sportEvents, setSportEvents] = useState(
    localStorage.getItem("sport") || "Soccer"
  );
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }: any, ref: any) => (
      <button style={{fontSize: 10}} className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );

  const fetchUserInfo = async () => {
    setLoader(true);
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const handleDateChange = (date) => {
    const customDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(date);

    return navigate("/filter", {
      state: {
        gameName: sportEvents,
        customDate: customDate,
      },
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);


  let createdDate = moment(new Date()).utc().format();
  let tomorrowDate = moment(createdDate).add(1, "d");

  useEffect(() => {
    const handleStorageChange = () => {
      setSportEvents(localStorage.getItem("sport"));
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
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
    <div style={{ ...styles.container }}>
      <DashboardLayout>
        <div>
          <div>
            <SliderComponent />
          </div>

          <div style={{ ...styles.div }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                customInput={
                  <ExampleCustomInput className="example-custom-input" />
                }
              />
            </div>
            {sportEvents && sportEvents === "Soccer" && <Football />}

            {sportEvents === "Basketball" && <Basketball />}

            {sportEvents === "Tennis" && <Tennis />}

            {sportEvents === "Horse" && <HorseRace />}
            {sportEvents === "Cricket" && <Cricket />}
            {sportEvents === "Boxing" && <Boxing />}
            {sportEvents === "Baseball" && <Baseball />}
            {sportEvents === "Volleyball" && <Volleyball />}
            {sportEvents === "Golf" && <Golf />}
            {sportEvents === "Hockey" && <Hockey />}
            {sportEvents === "Formula 1" && <Formula1 />}
            {sportEvents === "AFL" && <Rugby />}
            {sportEvents === "Handball" && <Handball />}
            {sportEvents === "Ice Hockey" && <IceHockey />}
            {sportEvents === "NASCAR" && <Nascar />}
            {sportEvents === "Futsal" && <Futsol />}
            {sportEvents === "MMA/UFC" && <Mma />}
            {sportEvents === "Darts" && <Darts />}
            {sportEvents === "Snooker" && <Snooker />}
            {sportEvents === "Esports" && <Easport />}
            {sportEvents === "Table Tennis" && <TableTennis />}
            {sportEvents === "Aussie Rules" && <AussieRules />}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Dashboard;
