import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";

const PinModal = ({ show, handleClose, handleAction,responseText}) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)
  const [disabled, setDisabled] = useState(true)


  const handleSuccessShow = () => {
  handleClose()
  setShowSuccess(true)
  }

useEffect(() => {
  if(otp?.length === 6){
    setDisabled(false)
  }
  else {
     setDisabled(true)
  }
}, [otp])

const checkOtp = async () => {
  await handleAction().then(aa => {
    handleSuccessShow()
  })
  
}


  return (
    <>
       <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>PIN</Modal.Title>
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
              Enter your 6-Digit Transaction PIN to complete this action.
            </p>
            <OtpComponent otp={otp} setOtp={setOtp} />
          </div>

          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                disabled={disabled}
                propStyle={{ width: "100%" }}
                handlePress={() => checkOtp()}
              />
            </div>
          </div>

        </div>
      </Modal.Body>
    </Modal>

    <SuccessModal 
      show={showSuccess}
      handleClose={() => setShowSuccess(false)}
      responseText={responseText}
    />
    </>
 
  );
};

export default PinModal;
