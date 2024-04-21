

import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import PaymentModal from "./PaymentModal";


const styles = {
  input: {
    backgroundColor: "transparent",
    padding: 10,
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    color: "black"

  }
}

const DepositModal = ({ show, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [amount, setAmount] = useState("")
  const [showOption, setShowOption] = useState(false)

  const handleOptionShow = () => {
  handleClose()
  setShowOption(true)
  }

  useEffect(() => {
    if(otp?.length === 6){
      //return navigate("/bet-success")
      handleOptionShow()
    }
}, [otp])


  return (
    <>
       <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Fund Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 0px 2rem 0px",
            }}
          >
            <p
              style={{
                ...FONTS.body7,
                margin: "0px 0px 15px 0px",
              }}
            >
              Please specify the amount you wish to top up into your wallet
            </p>
            
            <div style={{display: "flex", flexDirection: "column", marginBottom: 10}}>
              <label>Amount</label>
              <input placeholder="0.000" value={amount} onChange={(e) => setAmount(e?.target?.value)} style={{...styles.input}} />
            </div>
          </div>

          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ width: "100%" }}>
              <Button
                text="Proceed"
                propStyle={{ width: "100%" }}
                handlePress={() => handleOptionShow()}
              />
            </div>
          </div>
            
        </div>
      </Modal.Body>
    </Modal>

    <PaymentModal 
      show={showOption}
      handleClose={() => setShowOption(false)}
    />
    </>
 
  );
};

export default DepositModal;
