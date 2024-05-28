import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import house from "../../assets/images/house.svg"

import ChangeTransactionPin from "../../screens/TransactionPin/ChangeTransactionPin";



const ChangePin = ({show, handleClose }) => {
    return (
        <div>
 <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Change Pin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ChangeTransactionPin />
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default ChangePin