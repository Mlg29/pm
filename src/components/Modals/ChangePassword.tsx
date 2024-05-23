import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import house from "../../assets/images/house.svg";
import PasswordScreen from "../../screens/PasswordScreen";
import CreatePasswordNew from "../../screens/PasswordScreen/CreatePassword";

const ChangePassword = ({ show, handleClose }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreatePasswordNew />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChangePassword;
