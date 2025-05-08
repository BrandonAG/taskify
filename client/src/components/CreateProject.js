import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

function CreateProject(props) {
    const [userFormData, setUserFormData] = useState({ projectName: '' });

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
            projectName: '',
        });
      };

    return (
        <>
            <h2>Create New Project</h2>
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
                <Button
                    disabled={!(userFormData.projectName)}
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

export default CreateProject;