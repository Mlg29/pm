import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import { FlexDirection, TextAlign } from "../../utils/type";
import BetCard from "../BetCard";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import AcceptModal from "./AcceptModal";

const styles = {
  contain: {
    padding: 10,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "1px",
    width: "100%",
    marginBottom: 10,
  },
  inputs: {
    width: "100%",
    padding: "20px 0px 0px 0px",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "0.5px solid grey",
    outline: "none",
    //   textAlign: "center" as TextAlign,
    fontSize: "40px",
    fontWight: "600",
    fontFamily: "Poppins",
    color: "black",
    backgroundColor: "transparent",
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
};

const OpenBetModal = ({ show, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSuccessShow = () => {
    handleClose();
    setShowSuccess(true);
  };


  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Adjust Bet Stake</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  ...FONTS.body6,
                  margin: "0px 0px 15px 0px",
                }}
              >
                Please specify the amount you wish to adjust your bet stake
              </p>





              <div>
                <h3 style={{ ...FONTS.body6, marginBottom: "-20px" }}>Amount</h3>
                <input
                  style={{ ...styles.inputs }}
                  value={amount}
                  onChange={(e) => setAmount(e?.target?.value)}
                  placeholder="0.00"
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <h3 style={{ ...FONTS.body7 }}>
                    Available Balance: ₦18,000.00
                  </h3>
                  <h3 style={{ ...FONTS.body7, color: COLORS.green }}>
                    Bet All
                  </h3>
                </div>
              </div>

              <div style={{ width: "100%", marginTop: 30 }}>
                <Button
                  text="Proceed"
                  propStyle={{ width: "100%" }}
                   handlePress={() => handleSuccessShow()}
                />
              </div>
            </div>
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

export default OpenBetModal;
