import BottomTabs from "../../components/Tabs";
import notification from "../../assets/images/notification.svg";
import { useNavigate } from "react-router-dom";

import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useState } from "react";
import EmptyState from "../../components/EmptyState";
import SlipCard from "../../components/SlipCard";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import user from "../../assets/images/user.svg";
import { useMediaQuery } from "react-responsive";
import NavHeader from "./Components/NavHeader";
import ProfileDetail from "../Profile/ProfileDetail";
import Preference from "../NotificationScreen/Preference";
import Security from "../Security";
import Restrictions from "../Restrictions";
import OpenBetLayout from "../../components/OpenBetLayout";

const styles = {
  contain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.semiGray,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.semiGray,
    borderRadius: "5px",
    margin: "1rem 0px",
  },
  tb: {
    width: "31%",
    display: "flex",
    justifyContent: "center",
    padding: 10,
    margin: "5px",
    borderRadius: "5px",
  },
  rowBtw: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: "0.5px solid gray",
  },
  row: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px",
  },
};

function ProfileScreen() {
  const navigate = useNavigate();
  const [active, setActive] = useState("profile");
  const isLargeScreen = useMediaQuery({ minWidth: 1551 });
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1550 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  return (
    <>
      <NavHeader />
      <div
        style={{
          ...styles.contain,
          marginTop: 150,
          padding: isLargeScreen
            ? "30px 15rem"
            : isDesktop
            ? "30px 2rem"
            : "30px 2rem",
        }}
      >
        <div className="top-container" style={{ borderRadius: 10 }}>
          <div style={{ ...styles.container }}>
            <h3>Profile</h3>
          </div>
          <div style={{ ...styles.tabs }}>
            <div
              style={{
                ...styles.tb,
                backgroundColor:
                  active === "profile" ? COLORS.white : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setActive("profile")}
            >
              <p style={{ ...FONTS.body6 }}>Profile</p>
            </div>
            <div
              style={{
                ...styles.tb,
                backgroundColor:
                  active === "preference" ? COLORS.white : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setActive("preference")}
            >
              <p style={{ ...FONTS.body6 }}>Notifcation Preference</p>
            </div>
            <div
              style={{
                ...styles.tb,
                backgroundColor:
                  active === "security" ? COLORS.white : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setActive("security")}
            >
              <p style={{ ...FONTS.body6 }}>Security</p>
            </div>
            <div
              style={{
                ...styles.tb,
                backgroundColor:
                  active === "restriction" ? COLORS.white : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setActive("restriction")}
            >
              <p style={{ ...FONTS.body6 }}>Restrictions</p>
            </div>
          </div>

          {active === "profile" && (
            <div style={{display: 'flex'}}>
              <div style={{ width: "40%", margin: "0 auto" }}>
                <ProfileDetail />    
              </div> 
              <OpenBetLayout />
            </div>
          )}

          {active === "preference" && (
            <div style={{display: 'flex'}}> 
              <div style={{ width: "40%", margin: "0 auto" }}>
                <Preference />
              </div>
              <OpenBetLayout />
            </div>
          )}

          {active === "security" && (
            <div style={{display: 'flex'}}>
              <div style={{ width: "40%", margin: "0 auto" }}>
                <Security />
              </div>
              <OpenBetLayout />
            </div>
          )}
          {active === "restriction" && (
            <div style={{display: 'flex'}}>
              <div style={{ width: "40%", margin: "0 auto" }}>
                <Restrictions />
              </div>
              <OpenBetLayout />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
