import SearchInput from "../../../components/SearchComponent"
import heading from "../../../assets/images/heading.svg"
import { COLORS } from "../../../utils/colors"
import { FONTS } from "../../../utils/fonts"
import { useNavigate } from "react-router-dom"
import { IoIosTennisball, IoMdFootball } from "react-icons/io"
import { FaBasketballBall } from "react-icons/fa"
import { MdSportsCricket, MdSportsRugby } from "react-icons/md"
import more from "../../../assets/images/more.svg"
import { FlexDirection } from "../../../utils/type"
import { useMediaQuery } from "react-responsive"


const styles = {
    rowBtw: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottom: `1px solid ${COLORS.semiGray}`,
        background: COLORS.white,
        padding: "0px 20rem"
    },
    rowBtwTab: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottom: `1px solid ${COLORS.semiGray}`,
        background: COLORS.white,
        padding: "0px 2rem"
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "70%"
    },
    rowTab: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "70%"
    },
    rowBtwDes: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottom: `1px solid ${COLORS.semiGray}`,
        background: COLORS.white,
        padding: "0px 2rem"
    },
    rowDes: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "65%"
    },
}

function NavHeader() {
    const LargScreen = ({ children }: any) => {
        const isLargeScreen = useMediaQuery({ minWidth: 1551 })
        return isLargeScreen ? children : null
    }
    const Desktop = ({ children }: any) => {
        const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1550 })
        return isDesktop ? children : null
    }
    const Tablet = ({ children }: any) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
    const navigate = useNavigate()
    const itemList = [
        {
            id: 1,
            name: "Soccer",
            image: <IoMdFootball size={20} color={COLORS.white} />
        },
        {
            id: 2,
            name: "Basketball",
            image: <FaBasketballBall size={20} />
        },
        {
            id: 3,
            name: "Tennis",
            image: <IoIosTennisball size={20} />
        },
        {
            id: 4,
            name: "Cricket",
            image: <MdSportsCricket size={20} />
        },
        {
            id: 5,
            name: "Rugby",
            image: <MdSportsRugby size={20} />
        },
        {
            id: 6,
            name: "Volleyball",
            image: <MdSportsRugby size={20} />
        }, {
            id: 7,
            name: "Formula 1",
            image: <MdSportsRugby size={20} />
        },
        {
            id: 8,
            name: "Dog Race",
            image: <MdSportsRugby size={20} />
        },
        {
            id: 9,
            name: "Horse Race",
            image: <MdSportsRugby size={20} />
        },
        {
            id: 10,
            name: "More",
            image: more
        },
    ]
    return (
        <div>
            <LargScreen>
                <div style={{ ...styles.rowBtw }}>
                    <img src={heading} />
                    <div style={{ ...styles.row }}>
                        <div style={{ width: "50%" }}>
                            <SearchInput placeholder="Search by event, sport, club or game" />
                        </div>

                        <div style={{ background: COLORS.cream, padding: 16, width: 150, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, textAlign: "center" }}>Log In</p>
                        </div>
                        <div style={{ background: COLORS.primary, padding: 16, width: 180, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, color: COLORS.white, textAlign: "center" }}>Create Account</p>
                        </div>
                    </div>
                </div>

                <div style={{ ...styles.rowBtw }}>
                    <div style={{ display: "flex", overflowX: 'auto', whiteSpace: 'nowrap', margin: "10px 0px", scrollbarWidth: 'none' }}>
                        {
                            itemList?.map((info: any) => {
                                return (
                                    <div key={info?.id} style={{ display: 'inline-block', margin: '0 5px' }}>
                                        <div style={{ display: "flex", padding: "10px", backgroundColor: info?.name === "Soccer" ? COLORS.primary : "transparent", borderRadius: "30px", border: `1px solid ${COLORS.semiGray}` }}>
                                            {
                                                info?.name === "More" ? <img src={info?.image} /> : info?.image
                                            }
                                            <p style={{ ...FONTS.h6, color: info?.name === "Soccer" ? COLORS.white : COLORS.primary, margin: "0px 5px" }}>{info?.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </LargScreen>


            <Desktop>
                <div style={{ ...styles.rowBtwDes }}>
                    <img src={heading} />
                    <div style={{ ...styles.rowDes }}>
                        <div style={{ width: "50%" }}>
                            <SearchInput placeholder="Search by event, sport, club or game" />
                        </div>

                        <div style={{ background: COLORS.cream, padding: 16, width: 150, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, textAlign: "center" }}>Log In</p>
                        </div>
                        <div style={{ background: COLORS.primary, padding: 16, width: 180, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, color: COLORS.white, textAlign: "center" }}>Create Account</p>
                        </div>
                    </div>
                </div>

                <div style={{ ...styles.rowBtwDes }}>
                    <div style={{ display: "flex", overflowX: 'auto', whiteSpace: 'nowrap', margin: "10px 0px", scrollbarWidth: 'none' }}>
                        {
                            itemList?.map((info: any) => {
                                return (
                                    <div key={info?.id} style={{ display: 'inline-block', margin: '0 5px' }}>
                                        <div style={{ display: "flex", padding: "10px", backgroundColor: info?.name === "Soccer" ? COLORS.primary : "transparent", borderRadius: "30px", border: `1px solid ${COLORS.semiGray}` }}>
                                            {
                                                info?.name === "More" ? <img src={info?.image} /> : info?.image
                                            }
                                            <p style={{ ...FONTS.h6, color: info?.name === "Soccer" ? COLORS.white : COLORS.primary, margin: "0px 5px" }}>{info?.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Desktop>

            <Tablet>
            <div style={{ ...styles.rowBtwTab }}>
                    <img src={heading} />
                    <div style={{ ...styles.rowTab }}>
                        <div style={{ width: "30%" }}>
                            <SearchInput placeholder="Search by event, sport, club or game" />
                        </div>

                        <div style={{ background: COLORS.cream, padding: 16, width: 150, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, textAlign: "center" }}>Log In</p>
                        </div>
                        <div style={{ background: COLORS.primary, padding: 16, width: 180, borderRadius: 10 }}>
                            <p style={{ ...FONTS.h6, color: COLORS.white, textAlign: "center" }}>Create Account</p>
                        </div>
                    </div>
                </div>
            <div style={{ ...styles.rowBtwTab }}>
                    <div style={{ display: "flex", overflowX: 'auto', whiteSpace: 'nowrap', margin: "10px 0px", scrollbarWidth: 'none' }}>
                        {
                            itemList?.map((info: any) => {
                                return (
                                    <div key={info?.id} style={{ display: 'inline-block', margin: '0 5px' }}>
                                        <div style={{ display: "flex", padding: "10px", backgroundColor: info?.name === "Soccer" ? COLORS.primary : "transparent", borderRadius: "30px", border: `1px solid ${COLORS.semiGray}` }}>
                                            {
                                                info?.name === "More" ? <img src={info?.image} /> : info?.image
                                            }
                                            <p style={{ ...FONTS.h6, color: info?.name === "Soccer" ? COLORS.white : COLORS.primary, margin: "0px 5px" }}>{info?.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Tablet>
        </div>
    )
}

export default NavHeader
