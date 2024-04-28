import GameCard from "../../components/GameCard"
import GameDetailCardHeader from "../../components/GameDetailCardHeader"
import Header from "../../components/Header"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import user from "../../assets/images/user.svg"
import notification from "../../assets/images/notification.svg"
import { useMediaQuery } from "react-responsive"

const styles = {
    div: {
        border: `1px solid ${COLORS.semiGray}`,
        padding: 10,
    },
    cardDiv: {
        padding: 10,
        borderBottom: `1px solid ${COLORS.semiGray}`,

    },
    row: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0px"
    }
}

function BetDetail() {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    return (
        <div className="top-container">
            {
                isMobile &&  <Header
                text="Bet Details"
            />
            }
           

            <h3 style={{ ...FONTS.h5, textAlign: 'center' }}>Congratulations.</h3>

            <p style={{ ...FONTS.body7, textAlign: 'center', margin: "2rem 0px 10px 0px" }}>You've won</p>
            <h3 style={{ ...FONTS.h2, textAlign: 'center', color: COLORS.green, margin: "0px 0px 1rem 0px" }}>₦ 20,000</h3>

            <GameDetailCardHeader
                propStyle={{ backgroundColor: COLORS.semiGray, padding: "20px 20px" }}
            />


            <div style={{ ...styles.div }}>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Bet ID</p>
                    <h3 style={{ ...FONTS.h6 }}>98dG12UB</h3>
                </div>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Date & Time</p>
                    <h3 style={{ ...FONTS.h6 }}>01 Feb, 2024   10:39 PM</h3>
                </div> <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Stake</p>
                    <h3 style={{ ...FONTS.h6 }}>₦ 10,000</h3>
                </div>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Opponent</p>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{ ...styles.row }}>
                            <img src={user} width={20} />
                            <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>@JohnDdon</h3>
                        </div>
                        <img src={notification} />
                    </div>
              
                </div>
            </div>

        </div>
    )
}

export default BetDetail
