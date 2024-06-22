import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NotificationCard from "../../components/NotificationCard";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getNotifications, updateNotifications } from "../../redux/slices/NotificationSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";

function NotificationScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState([])
  const [updateLoader, setUpdateLoader] = useState(false)


 // console.log({notifications})


  const getNotification = async () => {
    await dispatch(getNotifications()).then(pp => {
      setNotifications(pp?.payload?.data)
    })
  }

  const markAsRead = async (id) => {
    const payload = {
      id: id
    }
    setUpdateLoader(true);
    var response = await dispatch(updateNotifications(payload))
    if(updateNotifications.fulfilled.match(response)){
      console.log({response})
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
    getNotification()
  }, [])




  return (
    <div className="top-container">
      <Header text="Notifications" />
      {
        updateLoader && <div style={{height: 30}}>
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
          notifications?.length < 1 && <div style={{marginTop: "-8rem"}}>
            <EmptyState 
            header={"No Notification Available"}
          />
          </div>

        }
      </div>

      <ToastContainer />
    </div>
  );
}

export default NotificationScreen;
