import { Modal } from "react-bootstrap";
import { FONTS } from "../../utils/fonts";
import NumberOfGames from "../../screens/Restrictions/NumberOfGames";



const NoGamesModal = ({show, handleClose }) => {
    return (
        <div>
 <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ ...FONTS.h6 }}>Number of Games</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <NumberOfGames/>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default NoGamesModal