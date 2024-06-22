import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NotificationCard from "../../components/NotificationCard";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getNotifications, updateNotifications } from "../../redux/slices/NotificationSlice";
import { ToastContainer, toast } from "react-toastify";

function NotificationScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([])
  const [updateLoader, setUpdateLoader] = useState(false)



  const getNotification = async () => {
    await dispatch(getNotifications()).then(pp => {
      setNotifications(pp?.payload?.data)
    })
  }

  const markAsRead = async () => {
    const payload = {
      id: ""
    }
    var response = await dispatch(updateNotifications(payload))
    if(updateNotifications.fulfilled.match(response)){

    }
    else {
      var errMsg = response?.payload as string;
      setUpdateLoader(false);
      toast.error(errMsg, {
        position: "bottom-center",
      });
    }
  }




  useEffect(() => {
    getNotification()
  }, [])




  return (
    <div className="top-container">
      <Header text="Notifications" />
      <div style={{ margin: "20px 0px 0px 0px" }}>
        <NotificationCard
          date="11 Jan, 2024  10:04"
          header="Bet Challenge"
          message="Daniel Joseph has invited to join the bet challenge with him on Milan vs AS Roma game for ₦ 20,000. "
          showBtn
        />
        <NotificationCard
          date="11 Jan, 2024  10:04"
          header="Bet Challenge"
          message="Daniel Joseph has invited to join the bet challenge with him on Milan vs AS Roma game for ₦ 20,000. "
          showBtn
        />
        <NotificationCard
          date="11 Jan, 2024  10:04"
          header="Bet Challenge"
          message="Daniel Joseph has invited to join the bet challenge with him on Milan vs AS Roma game for ₦ 20,000. "
        />
        <NotificationCard
          date="11 Jan, 2024  10:04"
          header="Bet Challenge"
          message="Daniel Joseph has invited to join the bet challenge with him on Milan vs AS Roma game for ₦ 20,000. "
        />
        <NotificationCard
          date="11 Jan, 2024  10:04"
          header="Bet Challenge"
          message="Daniel Joseph has invited to join the bet challenge with him on Milan vs AS Roma game for ₦ 20,000. "
        />
      </div>

      <ToastContainer />
    </div>
  );
}

export default NotificationScreen;
