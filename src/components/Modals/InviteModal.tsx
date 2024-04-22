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
import PaymentModal from "./PaymentModal";
import AcceptModal from "./AcceptModal";

const InviteModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccessShow = () => {
    handleClose();
    setShowSuccess(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Invite Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display: 'flex', flexDirection: "column", flex: 4}}>
            <TextInput
                    label="Username or Email Address"
                    placeholder="Enter your friend username or email"
                    required
                    value={email}
                    type="email"
                    handleChange={(val: string) => {
                        setEmail(val)
          
                    }}
                />
                  <TextInput
                    label="Amount"
                    placeholder="Enter Amount"
                    required
                    value={amount}
                    handleChange={(val: string) => {
                        setAmount(val)
          
                    }}
                />
            </div>

            <div style={{display: 'flex', flexDirection: "column", flex: 1, marginTop: 20}}>
            <Button
              text="Place Bet"
              propStyle={{ width: "100%" }}
              handlePress={() => handleSuccessShow()}

            />
            </div>
        </Modal.Body>
      </Modal>

      <AcceptModal
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default InviteModal;
