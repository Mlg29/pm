import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import PinModal from "./PinModal";
import { TbCalculatorFilled } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";


const styles = {
    row: {
      display: "flex",
      alignItems: "center",
      padding: "1rem 0px",
    },
    rowBtn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  };

const AcceptModal = ({ show, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccessShow = () => {
  handleClose()
  setShowSuccess(true)
  }



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
            //   justifyContent: "center",
            //   alignItems: "center",
              margin: "0px 0px 2rem 0px",
            }}
          >
            <p
              style={{
                ...FONTS.body6,
                margin: "0px 0px 15px 0px",
              }}
            >
              Select your preferred method to top up your wallet..
            </p>


            <div
        style={{
          backgroundColor: COLORS.cream,
          padding: "15px 20px",
          margin: "1rem 0px 2rem 0px",
          borderRadius: 20,
        }}
      >
        <p style={{ ...FONTS.body7, color: COLORS.gray, marginBottom: "10px" }}>
          Debit amount for this game
        </p>
        <h3 style={{ ...FONTS.h6 }}>₦10,000.00</h3>
      </div>

      <div style={{...styles.rowBtn}}>
        <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => handleSuccessShow()}>
            <div>
            <TbCalculatorFilled color={COLORS.white} size={30} style={{backgroundColor: COLORS.primary, padding: 5, borderRadius: "100%", marginRight: 15}} />
            </div>
            <div>
                <h3 style={{...FONTS.body6}}>Wallet</h3>
                <p style={{...FONTS.body7}}>Balance: ₦18,720.92</p>
            </div>
        </div>
        <FaChevronRight />
      </div>
          </div>

        </div>
      </Modal.Body>
    </Modal>

    {/* <PinModal 
      show={showSuccess}
      handleClose={() => setShowSuccess(false)}
      handleAction={() => {}}
      responseText={""}
    /> */}
    </>
 
  );
};

export default AcceptModal;
