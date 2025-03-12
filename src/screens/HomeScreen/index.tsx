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
import { forwardRef, useCallback, useEffect, useState } from "react";
import heading from "../../assets/images/heading.svg";
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

import { Sidebar } from "primereact/sidebar";

import Football from "../Games/Football";
import Basketball from "../Games/Basketball";
import asoccer from "../../assets/images/asoccer.svg";
import insoccer from "../../assets/images/insoccer.svg";
import abasketball from "../../assets/images/basketball.svg";
import inbasketball from "../../assets/images/inbasketball.svg";
import atennis from "../../assets/images/tennis.svg";
import intennis from "../../assets/images/intennis.svg";
import acricket from "../../assets/images/cricket2.svg";
import incricket from "../../assets/images/incricket2.svg";
import rugby from "../../assets/images/rugby.svg";
import avolleyball from "../../assets/images/volleyball.svg";
import involleyball from "../../assets/images/involleyball.svg";
import formula from "../../assets/images/formula.svg";
import abaseball from "../../assets/images/baseball.svg";
import inbaseball from "../../assets/images/inbaseball.svg";
import agolf from "../../assets/images/golf.svg";
import ingolf from "../../assets/images/ingolf.svg";
import ahorse from "../../assets/images/horse.svg";
import inhorse from "../../assets/images/inhorse.svg";
import ahockey from "../../assets/images/hockey.svg";
import inhockey from "../../assets/images/inhockey.svg";
import aussie from "../../assets/images/aussie.svg";
import handball from "../../assets/images/handball.svg";
import hockey from "../../assets/images/icehockey.svg";
import nascar from "../../assets/images/nascar.svg";
import futsol from "../../assets/images/futsol.svg";
import boxing from "../../assets/images/boxing.svg";
import ufc from "../../assets/images/ufc.svg";
import dart from "../../assets/images/dart.svg";
import snooker from "../../assets/images/snooker.svg";
import easport from "../../assets/images/easport.svg";
import tabletennis from "../../assets/images/tabletennis.svg";
import Tennis from "../Games/Tennis";
import { getTennisFixtures } from "../../redux/slices/TennisSlice";
import { BsFilterSquareFill } from "react-icons/bs";
import HorseRace from "../Games/HorseRace";
import Boxing from "../Games/Boxing";
import Cricket from "../Games/Cricket";
import Baseball from "../Games/BaseBall";
import Volleyball from "../Games/Volleyball";
import Golf from "../Games/Golf";
import Hockey from "../Games/Hockey";
import Formula1 from "../Games/Formula1";
import Rugby from "../Games/Rugby";
import Handball from "../Games/Handball";
import IceHockey from "../Games/IceHockey";
import Futsol from "../Games/Futsol";
import Nascar from "../Games/Nascar";
import Mma from "../Games/Mma";
import Darts from "../Games/Darts";
import Snooker from "../Games/Snooker";
import Easport from "../Games/Easport";
import TableTennis from "../Games/TableTennis";
import AussieRules from "../Games/AussieRules";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaCalendarAlt } from "react-icons/fa";



function HomeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Soccer");
  // const [user, setUser] = useState(false)
  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  const notifications = useAppSelector(notificationState) as any;
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState<any>(null)


  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }: any, ref: any) => (
      <button style={{ fontSize: 10 }} className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );



  const handleDateChange = (date) => {
    const today = new Date() as any;
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const difference = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

    const relativeDate = difference === 0 ? "d0" : difference < 0 ? `d${difference}` : `d${difference}`;

    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString().padStart(2, '0')}-${date.getFullYear()}`;
    if (relativeDate === "d0") {
      return
    }
    else {
      setCalendarDate({
        index: relativeDate,
        formattedDate: formattedDate
      })
    }

  };

  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  useEffect(() => {
    getNotification();
  }, []);

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
      name: "Horse",
      image: selected === "Horse" ? ahorse : inhorse,
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
      name: "Esports",
      image: easport,
    },
    // {
    //   id: 9,
    //   name: "Darts",
    //   image: dart,
    // },
    {
      id: 10,
      name: "Snooker",
      image: snooker,
    },

    {
      id: 11,
      name: "More",
      image: more,
    },
  ];

  const otherItemList = [
    // {
    //   id: 1,
    //   name: "Formula 1",
    //   image: formula,
    // },
    // {
    //   id: 2,
    //   name: "American League",
    //   image: rugby,
    // },
    {
      id: 1,
      name: "Darts",
      image: dart,
    },
    {
      id: 2,
      name: "Volleyball",
      image: involleyball,

    },
    {
      id: 3,
      name: "Handball",
      image: handball,
    },
    // {
    //   id: 6,
    //   name: "Futsal",
    //   image: futsol,
    // },
    {
      id: 11,
      name: "Cricket",
      image: selected === "Cricket" ? acricket : incricket,
    },
    {
      id: 4,
      name: "Ice Hockey",
      image: hockey,
    },
    // {
    //   id: 5,
    //   name: "NASCAR",
    //   image: nascar,
    // },

    // {
    //   id: 7,
    //   name: "Hockey",
    //   image: selected === "Hockey" ? ahockey : inhockey,
    // },
    {
      id: 8,
      name: "Baseball",
      image: selected === "Baseball" ? abaseball : inbaseball,
    },
    // {
    //   id: 10,
    //   name: "Golf",
    //   image: selected === "Golf" ? agolf : ingolf,
    // },

    {
      id: 12,
      name: "Table Tennis",
      image: tabletennis,
    },
    // {
    //   id: 13,
    //   name: "Aussie Rules",
    //   image: aussie,
    // },
  ];

  const nameExists = (name) => itemList.some(item => item.name === name);


  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    } else {
      handleLogOut()
    }
  };


  useEffect(() => {
    const getFetch = async () => {
      const token = localStorage.getItem("token")
      setLoader(true);
      if (token) {
        await fetchUserInfo();
      }
      setLoader(false);
    }
    getFetch()

  }, []);

  const handleMoreSelect = (data) => {
    setSelected(data);
    setVisible(false);
    navigate("/home");
  };

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
            <div style={{ backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 15, height: 15, borderRadius: 100, position: 'absolute' }}>
              <p style={{ fontSize: 8, color: 'white' }}>{notifications?.unreadCount}</p>
            </div>
            <img
              src={notification}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/notification")}
            />
          </div>
        ) : (
          <RxAvatar
            size={50}
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      {/* <SearchComponent disabled placeholder="Search by sport, club or game" /> */}

      {/* <div>
        <SliderComponent />
      </div> */}

      <div style={{ height: "250px", overflow: "hidden" }}>
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
              onClick={() =>
                info?.name === "More"
                  ? setVisible(true)
                  : setSelected(info?.name)
              }
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  backgroundColor:
                    info?.name === selected ? COLORS.primary : (!nameExists(selected) && info?.name === "More") ? COLORS.primary : "transparent",
                  borderRadius: "30px",
                  border: `1px solid ${COLORS.semiGray}`,
                }}
              >
                <img src={info?.image} />
                <p
                  style={{
                    ...FONTS.h6,
                    color:
                      info?.name === selected ? COLORS.white : (!nameExists(selected) && info?.name === "More") ? 'white' : COLORS.primary,
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <DatePicker
          selected={selectedDate}
          popperPlacement="left-start"
          onChange={(date) => handleDateChange(date)}
          minDate={new Date(new Date().setDate(new Date().getDate() - 7))}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          customInput={

            <FaCalendarAlt />
          }
        />
      </div>
      {selected === "Soccer" && (
        <div>
          <Football calendarDate={calendarDate} setCalendarDate={setCalendarDate} />
        </div>
      )}
      {selected === "Basketball" && <Basketball calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}

      {selected === "Tennis" && <Tennis calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}

      {selected === "Horse" && <HorseRace calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}

      {selected === "Boxing" && <Boxing calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Cricket" && <Cricket calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Baseball" && <Baseball calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Volleyball" && <Volleyball calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Golf" && <Golf calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Hockey" && <Hockey calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Formula 1" && <Formula1 calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "American League" && <Rugby calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Handball" && <Handball calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Ice Hockey" && <IceHockey calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "NASCAR" && <Nascar calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Futsal" && <Futsol calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "MMA/UFC" && <Mma calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Darts" && <Darts calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Snooker" && <Snooker calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Esports" && <Easport calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Table Tennis" && <TableTennis calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}
      {selected === "Aussie Rules" && <AussieRules calendarDate={calendarDate} setCalendarDate={setCalendarDate} />}

      {getToken && <BottomTabs />}
    </div>
  );
}

export default HomeScreen;
