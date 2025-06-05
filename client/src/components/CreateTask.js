import React, { useState } from "react";
import { Form, Button, Alert, Modal } from 'react-bootstrap';

function CreateTask({ projectID, userID, permission_id, setFormSubmitted }) {
    const [userFormData, setUserFormData] = useState({ taskName: '', taskDescription: '', assignedTo: userID, priorityID: 1, statusID: 1 });
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setFormSubmitted(false);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/project-users/' + projectID, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        setShow(true);
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
    
       try {
            fetch('http://localhost:3001/api/tasks', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task_name: userFormData.taskName,
                    task_description: userFormData.taskDescription,
                    user_id: userFormData.assignedTo,
                    project_id: projectID,
                    priority_id: userFormData.priorityID,
                    status_id: userFormData.statusID
                }),
            })
            .then((response) => {
                response.json()
            })
            .then((result) => {
                // window.location.reload();
                setFormSubmitted(true);
            });
        } catch (err) {
          console.error(err);
        }

        setShow(false)
    
        setUserFormData({
          taskName: '',
          taskDescription: '',
          priorityID: 1,
          statusID: 1
        });
      };

    return (
        <>
            <Button disabled={permission_id < 2} variant="primary" onClick={handleShow}>
                Add Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='taskName'>Task Name</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Task Name'
                            name='taskName'
                            onChange={handleInputChange}
                            value={userFormData.taskName}
                            required
                            />
                            <Form.Control.Feedback type='invalid'>Task name is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='taskDescription'>Task Description</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Task Description'
                            name='taskDescription'
                            onChange={handleInputChange}
                            value={userFormData.taskDescription}
                            required
                            />
                            <Form.Control.Feedback type='invalid'>Task description is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='assignedTo'>Assign To</Form.Label>
                            <Form.Select name="assignedTo" value={userFormData.assignedTo} onChange={handleInputChange} aria-label="Default select example">
                                {data !== null ? data.map((item, index) => (
                                <option key={item.id} value={item.user_id}>{item.user_name}</option>
                                )) : <></>}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='taskPriority'>Priority Level</Form.Label>
                            <Form.Select name="priorityID" value={userFormData.priorityID} onChange={handleInputChange} aria-label="Default select example">
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='taskStatus'>Status</Form.Label>
                            <Form.Select name="statusID" value={userFormData.statusID} onChange={handleInputChange} aria-label="Default select example">
                                <option value="1">Not Started</option>
                                <option value="2">In Progress</option>
                                <option value="3">Completed</option>
                            </Form.Select>
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

export default CreateTask;