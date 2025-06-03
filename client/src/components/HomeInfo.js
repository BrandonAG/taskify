import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';

function HomeInfo() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <i className="bi bi-question-circle"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Helpful Tips</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Click on a project name to view project tasks</li>
            <li>Click the pencil icon to edit a project's name</li>
            <li>Click the trashcan icon to delete a project</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomeInfo;