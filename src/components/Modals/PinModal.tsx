import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import { useEffect, useState } from "react";
import OtpComponent from "../OtpComponent";
import Button from "../Button";
import SuccessModal from "./SuccessModal";
import { useAppDispatch } from "../../redux/hooks";
import { verifyTransactionPin } from "../../redux/slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";






const PinModal = ({ show, handleClose, handleAction,type, responseText }) => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false)

  const handleSuccessShow = () => {
    setShowSuccess(true);
    handleClose();
   
  };

  useEffect(() => {
    if (otp?.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  const checkOtp = async () => {
    const transactionPayload = {
      transactionPin: otp,
    };
    setLoader(true)
    const verifyResponse = await dispatch(
      verifyTransactionPin(transactionPayload)
    );


  
    if (verifyTransactionPin.fulfilled.match(verifyResponse)) {
      await handleAction().then((aa) => {
        handleSuccessShow();
        setOtp("")
        setLoader(false);
      });
    } else {
      var errMsg = verifyResponse?.payload as string
      alert(errMsg)
      setLoader(false);
      // toast?.error(errMsg, {
      //   position: "bottom-center",
      // });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>PIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px 0px 2rem 0px",
              }}
            >
              <p
                style={{
                  ...FONTS.body6,
                  margin: "0px 0px 15px 0px",
                  textAlign: "center",
                }}
              >
                Enter your 6-Digit Transaction PIN to complete this action.
              </p>
              <OtpComponent otp={otp} setOtp={setOtp} />
            </div>

            <div style={{ display: "flex", flex: 1 }}>
              <div style={{ width: "100%" }}>
                <Button
                  text="Submit"
                  disabled={disabled}
                  propStyle={{ width: "100%" }}
                  isLoading={loader}
                  handlePress={() => checkOtp()}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
        type={type}
        responseText={responseText}
      />

      <ToastContainer />
    </>
  );
};

export default PinModal;
