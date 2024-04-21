import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";

const PinModal = ({ show, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccessShow = () => {
  handleClose()
  setShowSuccess(true)
  }

  useEffect(() => {
    if(otp?.length === 6){
      //return navigate("/bet-success")
      handleSuccessShow()
    }
}, [otp])


  return (
    <>
       <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Payment Option</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px 0px 2rem 0px",
            }}
          >
            <p
              style={{
                ...FONTS.body6,
                margin: "0px 0px 15px 0px",
                textAlign: "center",
              }}
            >
              Enter your 6-Digit Transaction PIN to place this bet.
            </p>
            <OtpComponent otp={otp} setOtp={setOtp} />
          </div>

          {/* <div style={{ display: "flex", flex: 1 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                propStyle={{ width: "100%" }}
                // handlePress={() => navigate('/home')}
              />
            </div>
          </div> */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem 0px" }}>
            <p style={{ ...FONTS.body6 }}>Forget PIN? </p>
            <p style={{ ...FONTS.h6, margin: "0px 3px", cursor: "pointer" }}> Reset PIN</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    <SuccessModal 
      show={showSuccess}
      handleClose={() => setShowSuccess(false)}
    />
    </>
 
  );
};

export default PinModal;
