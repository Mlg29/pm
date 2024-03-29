import { IoIosNotificationsOutline } from "react-icons/io"
import BottomTabs from "../../components/Tabs"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import profile from "../../assets/images/profile1.png"
import bag from "../../assets/images/bag.svg"
import language from "../../assets/images/language.svg"
import logout from "../../assets/images/logout.svg"
import notification from "../../assets/images/notification1.svg"
import user from "../../assets/images/user1.svg"
import arrowRight from "../../assets/images/arrow-right.svg"
import { useNavigate } from "react-router-dom"
import { FlexDirection } from "../../utils/type"

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
    margin: "1rem 0px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 20px",
    backgroundColor: COLORS.white,
    marginBottom: "20px",
    borderRadius: 20,
    border: "none"
  }
}

function Profile() {
  const navigate = useNavigate()

  const itemList = [
    {
      id: 1,
      name: "Profile",
      icon: user,
      color: "#F9F2F1",
      handleClick: () => navigate("/profile-detail")
    },
    {
      id: 2,
      name: "Notification Preference",
      icon: notification,
      color: "#7154E80D",
      handleClick: () => navigate("/notification-preference")
    },
    {
      id: 3,
      name: "Security",
      icon: bag,
      color: "#E9F7EA",
      handleClick: () => navigate("/security")
    },
    {
      id: 4,
      name: "App Language",
      icon: language,
      color: "#FFEEE3",
      handleClick: () => navigate("/language")
    },
    {
      id: 5,
      name: "Log out",
      icon: logout,
      handleClick: () => console.log("")
    }
  ]
  return (
    <div className='top-container'>
        <div style={{ ...styles.container }}>
          <h3 style={{ ...FONTS.h4, color: COLORS.primary }}>Profile</h3>
          <div>
            <IoIosNotificationsOutline size={45} color={COLORS.primary} style={{ border: "1px solid white", borderRadius: "100%", padding: 5 }} />
          </div>
        </div>
           

           <div style={{...styles.center}}>
              <img src={profile} />
              <h3 style={{...FONTS.h5, margin: "5px 0px"}}>Samson Ojo</h3>
              <p style={{...FONTS.body7, backgroundColor: COLORS.semiGray, padding: 10, borderRadius: 30}}>@holuwadharnyz</p>
           </div>

           <div style={{backgroundColor: COLORS.semiGray, borderRadius: 20}}>
            {
              itemList?.map((data: any) => {
                return (
                  <div key={data?.id} onClick={data?.handleClick} style={{...styles.row}}>
                   <div style={{backgroundColor: data?.color, padding: 5, borderRadius: 100}}>
                   <img src={data?.icon} />
                   </div>
                    <p style={{...FONTS.body6, margin: "0px 20px", width: "100%", color: `${data?.name === "Log out" ? COLORS.red : COLORS.primary}`}}>{data?.name}</p>
                   {
                    data?.name === "Log out" ?  null :  <img src={arrowRight} />
                   }
                   
                  </div>
                )
              })
            }
           </div>



        <BottomTabs />
    </div>
  )
}

export default Profile
