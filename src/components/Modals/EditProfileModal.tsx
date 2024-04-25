import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import house from "../../assets/images/house.svg"
import EditProfile from "../../screens/Profile/EditProfile";



const EditProfileModal = ({ show, handleClose }) => {
    return (
        <div>
       <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditProfile />
        </Modal.Body>
      </Modal>      
        </div>
    )
}

export default EditProfileModal