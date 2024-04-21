import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import card from "../../assets/images/card.svg";
import paypal from "../../assets/images/paypal.svg";
import arrowright from "../../assets/images/arrow-right.svg";
import house from "../../assets/images/house.svg";
import { useState } from "react";
import FundingModal from "./FundingModal";
import BankModal from "./BankModal";

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0px",
  },
};

const PaymentModal = ({ show, handleClose }) => {
    const [showTransfer, setShowTransfer] = useState(false)
    const [showFunding, setShowFunding] = useState(false)


    const handleTransferOpen = () => {
        handleClose()
        setShowTransfer(true)
    }

    const handleFundingOpen = () => {
        handleClose()
        setShowFunding(true)
    }


  const dataList = [
    {
      id: 1,
      name: "Bank Transfer",
      text: "Make a transfer directly from your wallet.",
      image: house,
      handleRoute: () => handleTransferOpen()
    },
    {
        id: 2,
        name: "Credit/Debit Card",
        text: "Add funds instantly using your bank card.",
        image: paypal,
        handleRoute: () => handleFundingOpen(),
      },
    {
      id: 3,
      name: "Paypal",
      text: "Add funds instantly using your bank card.",
      image: paypal,
      // handleRoute: () => navigate("/fund-wallet")
    },
  ];

  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ ...FONTS.h6 }}>Withdrawal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ ...FONTS.body6, margin: "0rem 0px 1rem 0px" }}>
          Select your preferred method to withdraw.
        </p>

        <div>
          {dataList?.map((data: any) => {
            return (
              <div
                key={data?.id}
                style={{ ...styles.row }}
                onClick={data?.handleRoute}
              >
                <img src={data?.image} />
                <div style={{ margin: "0px 10px", width: "100%", cursor: "pointer" }}>
                  <h3 style={{ ...FONTS.h6, margin: "0px" }}>{data?.name}</h3>
                  <p style={{ ...FONTS.body7, margin: "5px 0px" }}>
                    {data?.text}
                  </p>
                </div>
                <img src={arrowright} />
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>

    <BankModal
        show={showTransfer}
        handleClose={() => setShowTransfer(false)}
    />

<FundingModal
        show={showFunding}
        handleClose={() => setShowFunding(false)}
    />
    </>

  );
};

export default PaymentModal;
