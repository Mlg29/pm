import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NotificationCard from "../../components/NotificationCard";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getNotifications, updateNotifications } from "../../redux/slices/NotificationSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import { updateBetAdjust } from "../../redux/slices/BetSlice";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";

function NotificationScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([])
  const [updateLoader, setUpdateLoader] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loader, setLoader] = useState(false)

  //console.log({ notifications })


  const getNotification = async () => {
    await dispatch(getNotifications()).then(pp => {
      setNotifications(pp?.payload?.data)
      setLoader(false)
    })
  }

  const markAsRead = async (id) => {
    const payload = {
      id: id
    }
    setUpdateLoader(true);
    var response = await dispatch(updateNotifications(payload))
    if (updateNotifications.fulfilled.match(response)) {

      setUpdateLoader(false);
      getNotification()
      // toast.error(response?.payload?.data?.message, {
      //   position: "bottom-center",
      // });
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
    setLoader(true)
    getNotification()
  }, [])



  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "50vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="top-container" style={{ backgroundColor: 'transparent' }}>
      {
        !isMobile && <DesktopBackButton />
      }
      <div style={{ backgroundColor: 'white', padding: 16 }}>
        <Header text="Notifications" />

        {/* <Header text="Notifications" /> */}
        {
          updateLoader && <div style={{ height: 30 }}>
            <Loader />
          </div>
        }
        <div style={{ margin: "20px 0px 0px 0px" }}>
          {
            notifications?.map((data, i) => {
              return <div key={i}>
                <NotificationCard
                  data={data}
                  handleRead={(id) => markAsRead(id)}
                />
              </div>
            })
          }
          {
            notifications?.length < 1 && <div style={{ marginTop: "-3rem" }}>
              <EmptyState
                header={"No Notification Available"}
              />
            </div>

          }
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default NotificationScreen;
