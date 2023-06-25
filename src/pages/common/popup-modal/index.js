import Modal from 'react-bootstrap/Modal'
import {Button} from "react-bootstrap";

const PopupModal = ({children, title, show = false, handleClose, isStatic = false, footer}) => {
  return (
      <Modal show={show} onHide={handleClose} backdrop={isStatic ? "static" : true}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {footer}
        </Modal.Footer>
      </Modal>
  )
}

export default PopupModal;