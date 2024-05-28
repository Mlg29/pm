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
import { useEffect, useState } from "react";
import heading from "../../assets/images/heading.svg";
import { BaseUrl } from "../../https";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserData } from "../../redux/slices/AuthSlice";
import { footballEventState, footballFixtureState, getFootballEvents, getFootballFixtures } from "../../redux/slices/FootballSlice";

function HomeScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Soccer");
  // const [user, setUser] = useState(false)
  const dispatch = useAppDispatch() as any;
  const getToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const footballEvents = useAppSelector(footballEventState) as any
 // const footballFixtures = useAppSelector(footballFixtureState) as any
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [today, setToday] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])

  const sliderArr = [slider, slider2, slider3];

  //console.log({live,today, upcoming, tomorrow})

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === 2 ? 0 : currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);


  useEffect(()=> {
    const payloadLive = {
      status: "LIVE"
    }
    dispatch(getFootballFixtures(payloadLive)).then(dd => {
      setLive(dd?.payload)
    })
    // dispatch(getFootballFixtures()).then(dd => {
    //   setToday()
    // })
    // dispatch(getFootballFixtures()).then(dd => {
    //   setTomorrow()
    // })
    // dispatch(getFootballFixtures()).then(dd => {
    //   setUpcoming()
    // })
    dispatch(getFootballEvents())
  }, [])

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
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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

      <div>
        {sliderArr?.map((dd, i) => {
          return currentIndex === i ? (
            <div key={i}>
              <img src={dd} style={{ width: "100%" }} />
            </div>
          ) : null;
        })}
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

      <p style={{ ...FONTS.body6, color: COLORS.gray, margin: "15px 0px" }}>
        LIVE
      </p>

      {live?.data?.map((aa: any, i: any) => {
        return <GameCard key={i} data={aa} />;
      })}

      {getToken && <BottomTabs />}
    </div>
  );
}

export default HomeScreen;
