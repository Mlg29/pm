import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";

import SecretQuestion from "../../screens/SecretQuestion";

const SecretQuest = ({ show, handleClose }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Secret Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SecretQuestion />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SecretQuest;
