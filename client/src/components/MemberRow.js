import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MemberRow = ({ project_id, user_id, user_name, permission_id, setFormSubmitted }) => {
  const [permission, setPermission] = useState(permission_id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePermissionChange = (event) => {
        const { name, value } = event.target;
        setPermission(value);
        setFormSubmitted(false);
  };

  const handleUpdate = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
            fetch('http://localhost:3001/api/project-users/' + project_id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    permission_id: permission,
                }),
            })
            .then((response) => {
                response.json()
            })
            .then((result) => {
                // window.location.reload();
            });
        } catch (err) {
          console.error(err);
        }

        setFormSubmitted(true);
    };
    
    const handleDelete = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
            fetch('http://localhost:3001/api/project-users/' + project_id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                }),
            })
            .then((response) => {
                response.json()
                console.log('test');
            })
            .then((result) => {
                console.log(result);
                // window.location.reload();
            });
        } catch (err) {
          console.error(err);
        }

        setFormSubmitted(true);
    };

  return (
    <>
        <tr>
            <td className="align-middle">{user_name}</td>
            <td>
                <Form>
                    <Form.Select name="permission" value={permission} onChange={handlePermissionChange} aria-label="Default select example">
                        <option key="1" value="1">read-only</option>
                        <option key="2" value="2">read-write</option>
                        <option key="3" value="3">admin</option>
                    </Form.Select>
                </Form>
            </td>
            <td className="text-center">
                <Button variant={permission != permission_id ? "primary me-2" : "outline-secondary me-2"} onClick={handleUpdate}>
                    <i class="bi bi-floppy-fill"></i>
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                    <i className="bi bi-trash3-fill"></i>
                </Button>
            </td>
        </tr>
    </>
    
  );
};

export default MemberRow;