import Header from "../../components/Header"
import NotificationCard from "../../components/NotificationCard"



function NotificationScreen() {
    return (
        <div className="top-container">
            <Header
                text="Notifications"
            />
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
           
        </div>
    )
}

export default NotificationScreen
