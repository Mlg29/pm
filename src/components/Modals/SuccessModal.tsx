import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import success from "../../assets/images/success.svg"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { FlexDirection } from "../../utils/type";

export const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        padding: "0px 20px",
        flex: 1,
        height: "100%"
    },
    line: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 20px 0px 20px"
    },
    active: {
        backgroundColor: COLORS.primary,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    inactive: {
        backgroundColor: COLORS.semiGray,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    bottom: {
        display: 'flex',
        flexDirection: "column" as FlexDirection,
        justifyContent: 'center',
        alignItems: "center",
        margin: "0px 0px 10px 0px"
    }
}


const SuccessModal = ({ show, handleClose }) => {
    const navigate = useNavigate()
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div>
          <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <img src={success} style={{ marginBottom: "3rem" }} />

              <div>
                <h3
                  style={{
                    ...FONTS.h4,
                    fontWeight: "600",
                    textAlign: "center",
                    margin: "10px 0px",
                  }}
                >
                  Wallet Funded
                </h3>
                <p
                  style={{
                    ...FONTS.body6,
                    textAlign: "center",
                    fontWeight: "400",
                    marginBottom: 30
                  }}
                >
                  You have successfully funded your account
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div style={{ ...styles.bottom }}>
              <div style={{ width: "100%" }}>
                <Button
                  text="Go back Home"
                  propStyle={{ width: "100%" }}
                  handlePress={() => navigate("/home")}
                />
                <div style={{ marginBottom: 10 }} />
                <Button
                  text="View Transaction"
                  propStyle={{
                    width: "100%",
                    backgroundColor: COLORS.cream,
                    color: COLORS.primary,
                  }}
                  handlePress={() => navigate("/transaction-list")}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
