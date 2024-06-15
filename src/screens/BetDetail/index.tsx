import GameCard from "../../components/GameCard"
import GameDetailCardHeader from "../../components/GameDetailCardHeader"
import Header from "../../components/Header"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import user from "../../assets/images/user.svg"
import notification from "../../assets/images/notification.svg"
import { useMediaQuery } from "react-responsive"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { useEffect, useState } from "react"
import { getBetById } from "../../redux/slices/BetSlice"
import { formatCurrency } from "../../utils/helper"
import moment from "moment"

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
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const betInfo = location?.state?.betInfo
    const [betData, setBetData] = useState<any>()


    useEffect(() => {
        dispatch(getBetById(betInfo)).then(pp => {
            setBetData(pp?.payload)
        })
    }, [betInfo])

 

    return (
        <div className="top-container">
            {
                isMobile &&  <Header
                text="Bet Details"
            />
            }
           

            <h3 style={{ ...FONTS.h5, textAlign: 'center',margin: "0rem 0px 2rem 0px" }}>{betData?.status}</h3>

            {
                betData?.opponent ?             <p style={{ ...FONTS.body7, textAlign: 'center', margin: "0rem 0px 2rem 0px" }}>You've won</p> : null
            }
            <h3 style={{ ...FONTS.h2, textAlign: 'center', color: COLORS.gray, margin: "0px 0px 1rem 0px" }}>₦{formatCurrency(betData?.betAmount)}</h3>

            <GameDetailCardHeader
                data={betData?.sportEvent?.FootballEvent}
                propStyle={{ backgroundColor: COLORS.semiGray, padding: "20px 20px" }}
            />


            <div style={{ ...styles.div }}>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Bet ID</p>
                    <h3 style={{ ...FONTS.h6 }}>{betData?.id}</h3>
                </div>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Date & Time</p>
                    <h3 style={{ ...FONTS.h6 }}>{moment(betData?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                </div> <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Stake</p>
                    <h3 style={{ ...FONTS.h6 }}>₦ {formatCurrency(betData?.betAmount)}</h3>
                </div>
                <div style={{ ...styles.cardDiv }}>
                    <p style={{ ...FONTS.body7 }}>Opponent</p>
                  {
                    betData?.opponent ?
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{ ...styles.row }}>
                        <img src={betData?.opponent?.profileImage} style={{width: 20, height: 20, borderRadius: 20}} />
                        <h3 style={{ ...FONTS.h6, margin: "0px 0px 0px 5px" }}>@{betData?.opponent?.userName}</h3>
                    </div>
                    <img src={notification} />
                </div>
                :  <h3 style={{ ...FONTS.h6, margin: "0px" }}>No opponent</h3>
                  }
              
                </div>
            </div>

        </div>
    )
}

export default BetDetail
