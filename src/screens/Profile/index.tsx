import { IoIosNotificationsOutline } from "react-icons/io";
import BottomTabs from "../../components/Tabs";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import profile from "../../assets/images/profile1.png";
import bag from "../../assets/images/bag.svg";
import language from "../../assets/images/language.svg";
import logout from "../../assets/images/logout.svg";
import notification from "../../assets/images/notification1.svg";
import user from "../../assets/images/user1.svg";
import arrowRight from "../../assets/images/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { FlexDirection } from "../../utils/type";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import LogOut from "../../components/Modals/LogOut";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserData } from "../../redux/slices/AuthSlice";
import {
  getNotifications,
  notificationState,
} from "../../redux/slices/NotificationSlice";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 20px",
    backgroundColor: COLORS.white,
    marginBottom: "15px",
    borderRadius: 20,
    border: "none",
  },
};

function Profile() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const notifications = useAppSelector(notificationState) as any;
  const dispatch = useAppDispatch() as any;
  const [userData, setUserData] = useState(null);

  const getNotification = async () => {
    await dispatch(getNotifications());
  };

  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    getNotification();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemList = [
    {
      id: 1,
      name: "Profile",
      icon: user,
      color: "#F9F2F1",
      handleClick: () => navigate("/profile-detail"),
    },
    {
      id: 2,
      name: "Notification Preference",
      icon: notification,
      color: "#7154E80D",
      handleClick: () => navigate("/notification-preference"),
    },
    {
      id: 3,
      name: "Restrictions",
      icon: notification,
      color: "#7154E80D",
      handleClick: () => navigate("/restrictions"),
    },
    {
      id: 4,
      name: "Security",
      icon: bag,
      color: "#E9F7EA",
      handleClick: () => navigate("/security"),
    },
    {
      id: 5,
      name: "App Language",
      icon: language,
      color: "#FFEEE3",
      handleClick: () => navigate("/language"),
    },
    {
      id: 6,
      name: "Log out",
      icon: logout,
      handleClick: () => handleShow(),
    },
  ];
  return (
    <div className="top-container">
      <div style={{ ...styles.container }}>
        <h3 style={{ ...FONTS.h4, color: COLORS.primary }}>Profile</h3>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/notification")}
        >
          <div
            style={{
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 15,
              height: 15,
              borderRadius: 100,
              position: "absolute",
            }}
          >
            <p style={{ fontSize: 8, color: "white" }}>
              {notifications?.unreadCount}
            </p>
          </div>
          <IoIosNotificationsOutline
            size={45}
            color={COLORS.primary}
            style={{
              border: "1px solid white",
              borderRadius: "100%",
              padding: 5,
            }}
          />
        </div>
      </div>

      <div style={{ ...styles.center }}>
        {userData?.profileImage ? (
          <img
            src={userData?.profileImage}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
            }}
            alt=""
          />
        ) : (
          <img src={profile} />
        )}
        <h3 style={{ ...FONTS.h5, margin: "5px 0px" }}>
          {userData?.firstName} {userData?.lastName}
        </h3>
        <p
          style={{
            ...FONTS.body7,
            backgroundColor: COLORS.semiGray,
            padding: 10,
            borderRadius: 30,
          }}
        >
          @{userData?.userName}
        </p>
      </div>

      <div style={{ borderRadius: 20 }}>
        {itemList?.map((data: any) => {
          return (
            <div
              key={data?.id}
              onClick={data?.handleClick}
              style={{ ...styles.row, cursor: "pointer" }}
            >
              <div
                style={{
                  backgroundColor: data?.color,
                  padding: 5,
                  borderRadius: 100,
                }}
              >
                <img src={data?.icon} />
              </div>
              <p
                style={{
                  ...FONTS.body6,
                  margin: "0px 20px",
                  width: "100%",
                  color: `${
                    data?.name === "Log out" ? COLORS.red : COLORS.primary
                  }`,
                }}
              >
                {data?.name}
              </p>
              {data?.name === "Log out" ? null : <img src={arrowRight} />}
            </div>
          );
        })}
      </div>

      <BottomTabs />

      <LogOut show={show} handleClose={() => handleClose()} />
    </div>
  );
}

export default Profile;
