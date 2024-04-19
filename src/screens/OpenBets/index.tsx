import React from 'react'
import Header from '../../components/Header'
import { FONTS } from '../../utils/fonts'
import milan from "../../assets/images/millan.svg"
import roma from "../../assets/images/roma.svg"
import { COLORS } from '../../utils/colors'
import { FlexDirection } from '../../utils/type'
import { useNavigate } from 'react-router-dom'




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
    return (
        <div className='top-container' style={{ backgroundColor: "white" }}>
            <Header
                text="Open Bet"
            />
            <p style={{ ...FONTS.body6 }}>Please select from the available open bets created by other users that matches your option.
            </p>


            <div>
                {
                    ["", "", ""]?.map((data, i) => {
                        return <div key={i} style={{ ...styles.contain }}>
                            <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>UEFA - Champions League</p>

                            <div style={{ ...styles.row }}>
                                <div style={{ ...styles.center }}>
                                    <img src={milan} />
                                    <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>Milan</h3>
                                </div>
                                <div style={{ ...styles.center }}>
                                    <p style={{ ...FONTS.body7, marginTop: "10px" }}>10:15 PM</p>
                                    <h3 style={{ ...FONTS.h6, marginTop: "5px" }}>₦ 10,000</h3>
                                </div>
                                <div style={{ ...styles.center }}>
                                    <img src={roma} />
                                    <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>AS Roma</h3>
                                </div>
                            </div>

                            <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                                <div>
                                    <p style={{ ...FONTS.body7, marginTop: "10px" }}>@JohnDdon</p>
                                    <p style={{ ...FONTS.body7 }}>Milan Win</p>
                                </div>
                                <div>
                                    <p style={{ ...FONTS.body7, marginTop: "10px", textAlign: "right" }}>You</p>
                                    <p style={{ ...FONTS.body7 }}>Draw</p>
                                </div>
                            </div>

                            <div style={{ ...styles.row, paddingBottom: "0rem", border: "none" }}>
                                <div style={{ backgroundColor: COLORS.primary, width: "48%", padding: 10, borderRadius: 10 }} onClick={() => navigate("/options")}>
                                    <p style={{ ...FONTS.body7, color: COLORS.white, textAlign: "center", cursor: "pointer" }}>Accept Bet</p>
                                </div>
                                <div style={{ backgroundColor: COLORS.cream, width: "48%", padding: 10, borderRadius: 10 }}>
                                    <p style={{ ...FONTS.h7, color: COLORS.primary, textAlign: "center", cursor: "pointer" }}>Adjust Bet</p>
                                </div>
                            </div>
                        </div>


                    })
                }
            </div>


            <div>
                <div style={{ backgroundColor: COLORS.primary, width: "100%", padding: 20, borderRadius: 10, marginTop: 20 }} onClick={() => navigate('/create-bet')}>
                    <p style={{ ...FONTS.body5, color: COLORS.white, textAlign: "center", cursor: "pointer" }}>Create New Bet</p>
                </div>
            </div>
        </div>
    )
}

export default OpenBet
