import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";


import Maximum from "../../screens/Restrictions/Maximum";



const MaxModal = ({show, handleClose }) => {
    return (
        <div>
 <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Maximum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Maximum />
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default MaxModal