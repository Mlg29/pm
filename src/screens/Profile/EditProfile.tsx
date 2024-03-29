import Button from "../../components/Button"
import Header from "../../components/Header"
import profile from "../../assets/images/profile1.png"
import { FONTS } from "../../utils/fonts"
import { COLORS } from "../../utils/colors"
import trash from "../../assets/images/trash.svg"
import { useNavigate } from "react-router-dom"
import edit from "../../assets/images/edit.svg"
import TextInput from "../../components/TextInput"
import PhoneInputComponent from "../../components/PhoneInput"
import DatePickerComponent from "../../components/DatePickerComponent"
import { FlexDirection, Position } from "../../utils/type"

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        flex: 1,
        height: "100%",
        padding: "16px",
    },
    center: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem 0px"
    },
    row: {
        width: "100%"
    },
    trash: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "2rem 0px"
    },
    edit: {
        position: "relative" as Position,
        bottom: 20,
        left: 20
    }
}

function EditProfile() {
    const navigate = useNavigate()
    return (
        <div style={{ ...styles.container }}>
            <Header
                text="Edit Profile"
            />
            <div style={{ display: "flex", flexDirection: 'column', flex: 5 }}>
                <h3 style={{ ...FONTS.h4 }}>Personal Information</h3>
                <p style={{ ...FONTS.body6 }}>Update your personal information</p>
                <div style={{ ...styles.center }}>
                    <img src={profile} />
                    <img src={edit} style={{ ...styles.edit }} />
                </div>

                <div>
                    <div style={{ ...styles.row }}>
                        <TextInput
                            label="First Name"
                            required
                            placeholder="Samson"
                            disabled
                        />
                    </div>
                    <div style={{ ...styles.row }}>
                        <TextInput
                            label="Last Name"
                            required
                            placeholder="Ojo"
                            disabled
                        />
                    </div>
                    <div style={{ ...styles.row }}>
                        <TextInput
                            label="Username"
                            required
                            placeholder="Samson29"
                            disabled
                        />
                    </div>
                    <div style={{ ...styles.row }}>
                        <PhoneInputComponent
                            label="Phone Number"
                            required
                        />
                    </div>
                    <div style={{ ...styles.row }}>
                        <DatePickerComponent
                            label="Date of Birth"
                            propStyle={{ width: "100%" }}
                            disabled
                        />
                    </div>
                </div>
            </div>



            <div style={{ display: "flex", marginTop: "20px", flexDirection: 'column', flex: 1 }}>
                <Button
                    text="Save"
                    handlePress={() => navigate("/edit-profile")}
                />
            </div>
        </div>
    )
}

export default EditProfile
