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

const AdjustModal = ({ show, handleClose }) => {
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

              <div style={{ ...styles.contain }}>
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
                    <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                      10:15 PM
                    </p>
                    <h3 style={{ ...FONTS.h6, marginTop: "5px" }}>₦ 10,000</h3>
                  </div>
                  <div style={{ ...styles.center }}>
                    <img src={roma} />
                    <h3 style={{ ...FONTS.h6, marginTop: "10px" }}>AS Roma</h3>
                    <p style={{ ...FONTS.body7 }}>Unknown</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: COLORS.cream,
                  padding: "15px 20px",
                  margin: "1rem 0px 2rem 0px",
                  borderRadius: 20,
                }}
              >
                <p
                  style={{
                    ...FONTS.body7,
                    color: COLORS.gray,
                    marginBottom: "10px",
                  }}
                >
                  @JohnDoe Bet Amount
                </p>
                <h3 style={{ ...FONTS.h6 }}>₦10,000.00</h3>
              </div>

              <div>
                <h3 style={{ ...FONTS.body6 }}>Your Stake</h3>
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
                  text="Next"
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

export default AdjustModal;
