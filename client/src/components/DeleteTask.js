import { useState } from 'react';
import { Form, Button, Alert, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function DeleteTask({ task_id, task_name, permission_id, projectID }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        setShow(false);
    
        try {
            fetch('http://localhost:3001/api/tasks/' + task_id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    project_id: projectID
                }),
            })
            .then((response) => {
                response.json()
            })
            .then((result) => {
                window.location.reload();
            });
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <>
            <Button disabled={permission_id < 2} variant="outline-danger" onClick={handleShow}>
                <i className="bi bi-trash3-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {task_name}?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleSubmit}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>            
        </>
    )
}

export default DeleteTask;