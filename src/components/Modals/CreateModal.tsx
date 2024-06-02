import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import SuccessModal from "./SuccessModal";

import { FlexDirection } from "../../utils/type";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";
import InviteModal from "./InviteModal";
import OpenBetModal from "./OpenBetModal";



const styles = {
    contain: {
      padding: 15,
      border: `1px solid ${COLORS.semiGray}`,
      borderRadius: 10,
      margin: "10px 0px 20px 0px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "10px 0px",
    },
    center: {
      display: "flex",
      flexDirection: "column" as FlexDirection,
      justifyContent: "center",
      alignItems: "center",
    },
    rowBtn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: COLORS.cream,
      marginBottom: 20,
      padding: "15px 20px",
      borderRadius: 15
    }
  };

const CreateModal = ({ show, handleClose }) => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [inviteShow, setInviteShow] = useState(false)
    const [openBetShow, setOpenBetShow] = useState(false)

    const handleShowOpen = () => {
        handleClose()
        setShowSuccess(true)
    }

    const handleInviteOpen = () => {
        handleClose()
        setInviteShow(true)
    }

    const handleBetOpen = () => {
        handleClose()
        setOpenBetShow(true)
    }

  return (
    <>
       <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Create Bet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
        {[""]?.map((data, i) => {
          return (
            <div key={i} style={{ ...styles.contain }}>
              <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                UEFA - Champions League
              </p>

              <div style={{ ...styles.row }}>
                <div style={{ ...styles.center }}>
                  <img src={milan} />
                  <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>Milan</h3>
                  <p style={{ ...FONTS.body7 }}>(You)</p>
                </div>
                <div style={{ ...styles.center }}>
                  <p style={{ ...FONTS.body7, marginTop: "10px" }}>10:15 PM</p>
                </div>
                <div style={{ ...styles.center }}>
                  <img src={roma} />
                  <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>AS Roma</h3>
                  <p style={{ ...FONTS.body7 }}>Unknown</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 style={{ ...FONTS.h6 }}>Bet Option</h3>
        <p style={{ ...FONTS.body7, marginBottom: 20 }}>Select the option that best suit you</p>
      </div>

      <div style={{ ...styles.rowBtn }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => handleInviteOpen()}
        >
          <div>
            <IoIosPeople
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Invite Friends</h3>
            <p style={{ ...FONTS.body7 }}>Create a bet invite</p>
          </div>
        </div>
        <FaChevronRight />
      </div>

      <div style={{ ...styles.rowBtn }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => handleBetOpen()}
        >
          <div>
          <RiFileList3Fill
              color={COLORS.white}
              size={45}
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: "100%",
                marginRight: 15,
              }}
            />
          </div>
          <div>
            <h3 style={{ ...FONTS.h6 }}>Open Bet</h3>
            <p style={{ ...FONTS.body7 }}>Creat bet in the bet market</p>
          </div>
        </div>
        <FaChevronRight />
      </div>
      </Modal.Body>
    </Modal>


    <SuccessModal
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
        responseText={""}
    />

<InviteModal
        show={inviteShow}
        handleClose={() => setInviteShow(false)}
    />

<OpenBetModal
        show={openBetShow}
        handleClose={() => setOpenBetShow(false)}
    />
  
    </>
 
  );
};

export default  CreateModal;
