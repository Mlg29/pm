import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { FONTS } from '../../utils/fonts'
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import { COLORS } from '../../utils/colors'
import { FlexDirection } from '../../utils/type'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { getOpenBet } from '../../redux/slices/BetSlice'
import EmptyState from '../../components/EmptyState'




const styles = {
    contain: {
        padding: 15,
        border: `1px solid ${COLORS.semiGray}`,
        borderRadius: 10,
        margin: "10px 0px 20px 0px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        margin: "10px 0px",
        borderBottom: `1px solid ${COLORS.semiGray}`,
    },
    center: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        justifyContent: "center",
        alignItems: 'center',
    }
}


function OpenBet() {
    const navigate = useNavigate()
    const location = useLocation()
    const userSelection = location?.state?.userSelection
    const game = location?.state?.game
    const dispatch = useAppDispatch()
    const [openBets, setOpenBets] = useState([])


    console.log({game, openBets})


    useEffect(() => {
        const payload = {
            page: 1,
            pageSize: 20,
            id: userSelection?.sportEventId
        }

        dispatch(getOpenBet(payload)).then(pp => {
            setOpenBets(pp?.payload?.data)
        })
    }, [])

    const handleCreate = () => {
       return navigate('/create-bet', {
        state: {game: game}
       })
    }


    const handleAccept = (data) => {
        const payload = {
            invitedUser: null,
            amount: data?.betAmount,
            isAcceptBet: true,
            betId: data?.id
          };
          localStorage.setItem("inviteeInfo", JSON.stringify(payload));
          return navigate("/options");
    }

    const handleAdjust = (data) => {
        navigate("/adjust-bet")
    }

    return (
        <div className='top-container' style={{ backgroundColor: "white" }}>
            <Header
                text="Open Bet"
            />
            <p style={{ ...FONTS.body6 }}>Please select from the available open bets created by other users that matches your option.
            </p>


         {
            openBets?.length > 0 &&    <div>
            {
                openBets?.map((data, i) => {
                    return <div key={i} style={{ ...styles.contain }}>
                        <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>{game?.leagueName}</p>

                        <div style={{ ...styles.row }}>
                            <div style={{ ...styles.center }}>
                                <img src={game?.localTeamLogo} alt="" style={{width: "20px"}} />
                                <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>{game?.localTeamName}</h3>
                            </div>
                            <div style={{ ...styles.center }}>
                                <p style={{ ...FONTS.body7, marginTop: "10px" }}>{game?.status}</p>
                                <h3 style={{ ...FONTS.h6, marginTop: "5px" }}>{data?.betCurrency === "NGN" ? "₦" : "$"}{data?.betAmount}</h3>
                            </div>
                            <div style={{ ...styles.center }}>
                                <img src={roma} />
                                <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>{game?.visitorTeamName}</h3>
                            </div>
                        </div>

                        <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                            <div>
                                <p style={{ ...FONTS.body7, marginTop: "10px" }}>@JohnDdon</p>
                                <p style={{ ...FONTS.body7 }}>Milan Win</p>
                            </div>
                            <div>
                                <p style={{ ...FONTS.body7, marginTop: "10px", textAlign: "right" }}>@{data?.user?.userName}</p>
                                <p style={{ ...FONTS.body7 }}>{data?.prediction === "W1" ? `${game?.localTeamName} WIN` : data?.prediction === "W2" ? `${game?.visitorTeamName} WIN` : "DRAW"}</p>
                            </div>
                        </div>

                        <div style={{ ...styles.row, paddingBottom: "0rem", border: "none" }}>
                            <div style={{ backgroundColor: COLORS.primary, width: "48%", padding: 10, borderRadius: 10 }} onClick={() => handleAccept(data)}>
                                <p style={{ ...FONTS.body7, color: COLORS.white, textAlign: "center", cursor: "pointer" }}>Accept Bet</p>
                            </div>
                            <div style={{ backgroundColor: COLORS.cream, width: "48%", padding: 10, borderRadius: 10 }} onClick={() => handleAdjust(data)}>
                                <p style={{ ...FONTS.h7, color: COLORS.primary, textAlign: "center", cursor: "pointer" }}>Adjust Bet</p>
                            </div>
                        </div>
                    </div>


                })
            }
        </div>
         }
         {
            !openBets || openBets.length < 1 && <div>
                <EmptyState 
                    header="No Open bets available for your selection"
                />
            </div>
         }


            <div>
                <div style={{ backgroundColor: COLORS.primary, width: "100%", padding: 20, borderRadius: 10, marginTop: 20 }} onClick={() => handleCreate()}>
                    <p style={{ ...FONTS.body5, color: COLORS.white, textAlign: "center", cursor: "pointer" }}>Create New Bet</p>
                </div>
            </div>
        </div>
    )
}

export default OpenBet
