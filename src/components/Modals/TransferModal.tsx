import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import Dropdown from "../Dropdown";
import TextInput from "../TextInput";
import Button from "../Button";
import { useState } from "react";
import PinModal from "./PinModal";

const TransferModal = ({ show, handleClose }) => {
  const [showOtp, setShowOtp] = useState(false)
  const handleOtpShow = () => {
    handleClose()
    setShowOtp(true)
  }

  
  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Bank Transfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Dropdown
              label="Bank Name"
              required
              placeholder="Select Bank Name"
              data={[]}
            />

            <TextInput
              label="Account Number"
              placeholder="Enter your account number"
              required
            />

            <TextInput label="Amount" placeholder="₦0.00" required />
          </div>

          <div style={{ display: "flex", marginTop: 20 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                propStyle={{ width: "100%" }}
                 handlePress={() => handleOtpShow()}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    <PinModal 
      show={showOtp}
      handleClose={() => setShowOtp(false)}
      handleAction={() => {}}
      responseText={""}
    />
    </>

  );
};

export default TransferModal;
