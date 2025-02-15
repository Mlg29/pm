import { AflLeague, AussieLeague, BaseballLeague, BasketLeagues, BoxingLeague, CricketLeague, HorseLeague, Leagues, MmaLeague, NascarLeague, TennisLeague } from "../../../utils/leagues";
import ads from "../../../assets/images/ads.svg";
import empty from "../../../assets/images/empty.svg";
import { COLORS } from "../../../utils/colors";
import SearchInput from "../../../components/SearchComponent";
import { FONTS } from "../../../utils/fonts";
import { FlexDirection } from "../../../utils/type";
import NavHeader from "./NavHeader";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import OpenBetLayout from "../../../components/OpenBetLayout";
import { useEffect, useState } from "react";
import { getCountryListMap } from "country-flags-dial-code";


const styles = {
  container: {
    padding: "0px 15rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  containerDes: {
    padding: "0px 2rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  containerTab: {
    padding: "0px 2rem",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
    background: COLORS.semiGray,
  },
  box1: {
    width: "25%",
  },
  box2: {
    width: "45%",
    // background: COLORS.semiGray
  },
  box3: {
    width: "25%",
  },
  subBox: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: "1rem",
    borderRadius: 10,
  },
  subBox2: {
    backgroundColor: COLORS.white,
    padding: 20,
    overlowY: 'scroll',
    marginBottom: "1rem",
    borderRadius: 10,
  },
  sub: {
    backgroundColor: COLORS.white,
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mini: {
    border: `1px solid ${COLORS.gray}`,
    borderRadius: 10,
    marginBottom: 25,
  },
  bg: {
    backgroundColor: COLORS.primary,
    padding: "10px",
    borderRadius: "10px 10px 0px 0px",
    border: "none",
  },
};
function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [search, setSearch] = useState("")
  const [sportEvents, setSportEvents] = useState(
    localStorage.getItem("sport") || "Soccer"
  );

  const LargScreen = ({ children }: any) => {
    const isLargeScreen = useMediaQuery({ minWidth: 1551 });
    return isLargeScreen ? <div style={{ marginTop: 150 }}>{children}</div> : null;
  };
  const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1550 });
    return isDesktop ? <div style={{ marginTop: 150 }}>{children}</div> : null;
  };
  const Tablet = ({ children }: any) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? <div style={{ marginTop: 150 }}>{children}</div> : null;
  };

  const handleLeague = (name) => {
    navigate("/league", {
      state: { name: name, sport: sportEvents }
    })
  }


  useEffect(() => {
    const handleStorageChange = () => {
      setSportEvents(localStorage.getItem("sport"));
    };

    window.addEventListener("localStorageUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const countries1 = getCountryListMap();
    let x = Array.from(Object.values(countries1));
    setCountryList(x);
  }, []);


  const countries = countryList?.filter(m => m?.country?.toLowerCase().includes(search?.toLowerCase())).map(dd => dd?.country)
  const TopLeagues = sportEvents === "Soccer" ? Leagues : sportEvents === "Basketball" ? BasketLeagues : sportEvents === "Tennis" ? TennisLeague : sportEvents === "Horse" ? HorseLeague : sportEvents === "Boxing" ? BoxingLeague : sportEvents === "MMA/UFC" ? MmaLeague : sportEvents === "Cricket" ? CricketLeague : sportEvents === "AFL" ? AflLeague : sportEvents === "NASCAR" ? NascarLeague : sportEvents === "Baseball" ? BaseballLeague : sportEvents === "Aussie Rules" ? AussieLeague : []

  const handleChange = (val) => {
    console.log(val)
    setSearch(val)
  }

  return (
    <div>
      <NavHeader />
      <LargScreen>
        <div style={{ ...styles.container }}>
          <div style={{ ...styles.box1 }}>
            <div style={{ ...styles.subBox }}>
              <h3 style={{ ...FONTS.h6 }}>Top Leagues</h3>

              <>
                {TopLeagues?.map((data: any, i) => {
                  return (
                    <div key={i} onClick={() => handleLeague(data?.name)}>
                      <p
                        style={{
                          ...FONTS.body6,
                          margin: "15px 0px",
                          cursor: "pointer",
                        }}
                      >
                        {data?.name}
                      </p>
                    </div>
                  );
                })}
              </>



            </div>
            <div style={{ ...styles.subBox2 }}>
              <h3 style={{ ...FONTS.h6 }}>A - Z</h3>
              {/* <input placeholder="Search by country" value={search} onChange={(e) => handleChange(e.target.value)} style={{ backgroundColor: 'white', padding: 10, border: '1px solid gray', borderRadius: 5 }} /> */}

              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                {countries?.map((data: any, i) => {
                  return (
                    <div key={i}>
                      <p style={{ ...FONTS.body6, margin: "15px 0px" }}>
                        {data}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </LargScreen>

      <Desktop>
        <div style={{ ...styles.containerDes }}>
          <div style={{ ...styles.box1 }}>
            <div style={{ ...styles.subBox }}>
              <h3 style={{ ...FONTS.h6 }}>Top Leagues</h3>
              <>
                {TopLeagues?.map((data: any, i) => {
                  return (
                    <div key={i} onClick={() => handleLeague(data?.name)}>
                      <p style={{ ...FONTS.body6, margin: "15px 0px", cursor: 'pointer' }}>
                        {data?.name}
                      </p>
                    </div>
                  );
                })}
              </>



            </div>
            <div style={{ ...styles.subBox2 }}>
              <h3 style={{ ...FONTS.h6 }}>A - Z</h3>
              {/* <input placeholder="Search by country" value={search} onChange={(e) => handleChange(e.target.value)} style={{ backgroundColor: 'white', padding: 10, border: '1px solid gray', borderRadius: 5 }} /> */}

              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                {countries?.map((data: any, i) => {
                  return (
                    <div key={i}>
                      <p style={{ ...FONTS.body6, margin: "15px 0px" }}>
                        {data}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </Desktop>

      <Tablet>
        <div style={{ ...styles.containerTab }}>
          <div style={{ ...styles.box1 }}>
            <div style={{ ...styles.subBox }}>
              <h3 style={{ ...FONTS.h7 }}>Top Leagues</h3>
              {TopLeagues?.map((data: any, i) => {
                return (
                  <div key={i} onClick={() => handleLeague(data?.name)}>
                    <p style={{ ...FONTS.body7, margin: "15px 0px", cursor: 'pointer' }}>
                      {data?.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div style={{ ...styles.subBox2 }}>
              <h3 style={{ ...FONTS.h6 }}>A - Z</h3>
              {/* <input placeholder="Search by country" value={search} onChange={(e) => handleChange(e.target.value)} style={{ backgroundColor: 'white', padding: 10, border: '1px solid gray', borderRadius: 5 }} /> */}

              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                {countries?.map((data: any, i) => {
                  return (
                    <div key={i}>
                      <p style={{ ...FONTS.body6, margin: "15px 0px" }}>
                        {data}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ ...styles.box2 }}>{children}</div>
          <OpenBetLayout />
        </div>
      </Tablet>
    </div>
  );
}

export default DashboardLayout;
