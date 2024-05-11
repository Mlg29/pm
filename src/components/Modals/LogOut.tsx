import { Modal } from 'react-bootstrap';
import { useState } from "react"
import Button from "../../components/Button"
import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import { useNavigate } from 'react-router-dom';



const LogOut = ({show, handleClose}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

  const handleLogOut = () => {
    setLoader(true)
    localStorage.clear()
    setTimeout(() => {
      setLoader(false)
      handleClose()
      navigate("/home")
    }, 1000)
  }

    return (
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <p style={{ ...FONTS.h6, marginBottom: "10px", textAlign: "center" }}>Log out</p>
          <p style={{ ...FONTS.body6, marginBottom: "10px", textAlign: "center" }}>Are you sure you want to log out?</p>


          <div style={{ marginTop: "20px" }}>

            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button
                text="Yes, Log out"
                isLoading={loader}
                propStyle={{ width: "100%", backgroundColor: COLORS.red, color: COLORS.white }}
                handlePress={() => handleLogOut()}
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
    )
}

export default LogOut