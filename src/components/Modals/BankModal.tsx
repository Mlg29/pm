import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import house from "../../assets/images/house.svg"



const BankModal = ({ show, handleClose }) => {
    const [showSuccess, setShowSuccess] = useState(false)

    const handleShowOpen = () => {
        handleClose()
        setShowSuccess(true)
    }

  return (
    <>
       <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Bank Transfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
                <p style={{ ...FONTS.body7, textAlign: 'center', fontWeight: '400' }}>Amount</p>
                <h3 style={{ ...FONTS.h4, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>20,000.00</h3>
                <p style={{ ...FONTS.body7, textAlign: 'center', fontWeight: '400' }}>Transfer NGN 20,620 to the account number below.  Copy the details and paste them into your banking app. Kindly note that this account should be used solely for this transaction.</p>
            </div>

            <div style={{margin: "2rem 0px 0px 0px", padding: "1rem", backgroundColor: COLORS.cream, borderRadius: 10}}>
                <div style={{display: 'flex', alignItems: "center"}}>
                    <img src={house} />
                    <h3 style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Bank Details</h3>
                </div>

                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Account Number</p>
                    <h3 style={{...FONTS.h6}}>0987654321</h3>
                </div>
                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Account Name</p>
                    <h3 style={{...FONTS.h6}}>PlayZeet</h3>
                </div>
                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Bank Name</p>
                    <h3 style={{...FONTS.h6}}>Access Bank</h3>
                </div>

            </div>

            <p style={{...FONTS.body7, textAlign: 'center', margin: "2rem 0px", color: COLORS.gray}}>Expires in 29:59</p>
       
            <div style={{margin: "2rem 0px 0px 0px", padding: "1rem", backgroundColor: COLORS.cream, borderRadius: 10}}>
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer"}} onClick={() => handleShowOpen()}>
                    <h3 style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>I’ve sent the money</h3>
                </div>
            </div>
      </Modal.Body>
    </Modal>


    <SuccessModal
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
        responseText={""}
        type=""
    />
  
    </>
 
  );
};

export default BankModal;
