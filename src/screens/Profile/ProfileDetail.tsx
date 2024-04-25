import Button from "../../components/Button"
import Header from "../../components/Header"
import profile from "../../assets/images/profile1.png"
import { FONTS } from "../../utils/fonts"
import { COLORS } from "../../utils/colors"
import trash from "../../assets/images/trash.svg"
import { useNavigate } from "react-router-dom"
import { FlexDirection } from "../../utils/type"
import { useState } from "react"
import { Modal } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive"
import EditProfileModal from "../../components/Modals/EditProfileModal"






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
        display: "flex",
        flexDirection: "row" as FlexDirection,
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
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowEdit = () => setShowEdit(true);
    
    return (
        <div style={{ ...styles.container }}>
            {
                isMobile &&  <Header
                text="Profile"
            />
            }
           
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

                <div style={{...styles.trash}} onClick={() => handleShow()}>
                    <img src={trash} />
                    <h3 style={{...FONTS.h6, color: COLORS.red, margin: "0px 0px 0px 10px", cursor: "pointer"}}>Delete Account</h3>
                </div>
            </div>



            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
               {
                isMobile ?  <Button
                text="Edit Account"
                handlePress={() => navigate("/edit-profile")}
            />
            :
            <Button
            text="Edit Account"
            handlePress={() => handleShowEdit()}
        />
               }
            </div>



            <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <p style={{ ...FONTS.h6, marginBottom: "10px", textAlign: "center" }}>Delete Account</p>
          <p style={{ ...FONTS.body6, marginBottom: "10px", textAlign: "center" }}>You won’t be able to access your data again once you delete your account.</p>


          <div style={{ marginTop: "20px" }}>

            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button
                text="Yes, Delete my account"
                propStyle={{ width: "100%", backgroundColor: COLORS.red, color: COLORS.white }}

              />
            </div>
            <div style={{ width: "100%", margin: "20px 0px" }}>
              <Button
                text="Cancel"
                propStyle={{ width: "100%", backgroundColor: COLORS.white, color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}
                handlePress={() => handleClose()}
              />
            </div>
          </div>

        </Modal.Body>

      </Modal>

      <EditProfileModal 
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        />
        
        </div>
    )
}

export default ProfileDetail
