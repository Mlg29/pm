import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import DatePickerComponent from "../DatePickerComponent";

const FundingModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccessShow = () => {
    handleClose();
    setShowSuccess(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Fund Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "column", flex: 5 }}>
            <TextInput
              label="Card Number"
              placeholder="Enter your card number"
              required
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "48%" }}>
                <TextInput label="CVV" placeholder="000" required />
              </div>
              <div style={{ width: "48%" }}>
                <DatePickerComponent
                  label="Expiry Date"
                  required
                  propStyle={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", marginTop: 30 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Submit"
                propStyle={{ width: "100%" }}
                handlePress={() => handleSuccessShow()}
              />
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

export default FundingModal;
