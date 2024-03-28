import Button from "../../components/Button"
import Header from "../../components/Header"
import profile from "../../assets/images/profile1.png"
import { FONTS } from "../../utils/fonts"
import { COLORS } from "../../utils/colors"
import trash from "../../assets/images/trash.svg"
import { useNavigate } from "react-router-dom"

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        padding: "16px",
    },
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem 0px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${COLORS.semiGray}`,
        padding: "30px 0px 10px 0px"
    },
    trash: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "2rem 0px"
    }
}

function ProfileDetail() {
    const navigate = useNavigate()
    return (
        <div style={{ ...styles.container }}>
            <Header
                text="Profile"
            />
            <div style={{ display: "flex", flexDirection: 'column', flex: 5 }}>
                <div style={{ ...styles.center }}>
                    <img src={profile} />
                    <h3 style={{ ...FONTS.h5, margin: "5px 0px" }}>Samson Ojo</h3>
                    <p style={{ ...FONTS.body7, backgroundColor: COLORS.semiGray, padding: 10, borderRadius: 30 }}>@holuwadharnyz</p>
                </div>

                <div>
                    <div style={{...styles.row}}>
                        <p style={{...FONTS.body6}}>First Name</p>
                        <h3 style={{...FONTS.h6}}>Samson</h3>
                    </div>
                    <div style={{...styles.row}}>
                        <p style={{...FONTS.body6}}>Last Name</p>
                        <h3 style={{...FONTS.h6}}>Ojo</h3>
                    </div>
                    <div style={{...styles.row}}>
                        <p style={{...FONTS.body6}}>Date of Birth</p>
                        <h3 style={{...FONTS.h6}}>11 Jan, 1930</h3>
                    </div>
                    <div style={{...styles.row}}>
                        <p style={{...FONTS.body6}}>Phone Number</p>
                        <h3 style={{...FONTS.h6}}>+234 800 000 0000</h3>
                    </div>
                    <div style={{...styles.row}}>
                        <p style={{...FONTS.body6}}>Email</p>
                        <h3 style={{...FONTS.h6}}>samsonojo134@gmail.com</h3>
                    </div>
                </div>

                <div style={{...styles.trash}}>
                    <img src={trash} />
                    <h3 style={{...FONTS.h6, color: COLORS.red, margin: "0px 0px 0px 10px"}}>Delete Account</h3>
                </div>
            </div>



            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
                <Button
                    text="Edit Account"
                    handlePress={() => navigate("/edit-profile")}
                />
            </div>
        </div>
    )
}

export default ProfileDetail
