import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

function CreateTask(props) {
    const [userFormData, setUserFormData] = useState({ taskName: '', taskDescription: '', priorityID: 1, status: 1 });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };

    function cancelSubmit(e) {
        e.preventDefault()
        // Code to handle login goes here
        props.toggle()
    }

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
                    project_id: props.projectID,
                    priority_id: userFormData.priorityID,
                    status_id: userFormData.status
                }),
            })
            .then((response) => {
                response.json()
                console.log('test');
            })
            .then((result) => {
                console.log(result);
                window.location.reload();
            });
        } catch (err) {
          console.error(err);
        }
    
        setUserFormData({
          taskName: '',
          taskDescription: '',
        });
      };

    return (
        <>
            <h2>Create New Task</h2>
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
                    <Form.Label htmlFor='taskPriority'>Priority Level</Form.Label>
                    <Form.Select value={userFormData.priorityID} onChange={handleInputChange} aria-label="Default select example">
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='taskStatus'>Status</Form.Label>
                    <Form.Select value={userFormData.status} onChange={handleInputChange} aria-label="Default select example">
                        <option value="1">Not Started</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                    </Form.Select>
                </Form.Group>
                <Button
                    disabled={!(userFormData.taskName && userFormData.taskDescription)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
                 <Button
                    onClick={cancelSubmit}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default CreateTask;