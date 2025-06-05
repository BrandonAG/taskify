import { useState } from 'react';
import { Form, Button, Alert, Modal} from 'react-bootstrap';

function CreateProject({ setFormSubmitted }) {
    const [userFormData, setUserFormData] = useState({ projectName: '' });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setFormSubmitted(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

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
            fetch('http://localhost:3001/api/projects', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    project_name: userFormData.projectName,
                }),
            })
            .then(response => response.json())
            .then((result) => {
                // window.location.reload();
            });
        } catch (err) {
          console.error(err);
        }
        
        setFormSubmitted(true);

        setUserFormData({
            projectName: '',
        });
      };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Project
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='projectName'>Project Name</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Project Name'
                            name='projectName'
                            onChange={handleInputChange}
                            value={userFormData.projectName}
                            required
                            />
                            <Form.Control.Feedback type='invalid'>Project name is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateProject;