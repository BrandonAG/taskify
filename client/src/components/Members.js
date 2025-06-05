import { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal, Table } from 'react-bootstrap';
import MemberRow from './MemberRow';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Members({ project_id, permission_id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userFormData, setUserFormData] = useState({ username: '', permission: 1 });
    const [show, setShow] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setFormSubmitted(false);
        setShow(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/project-users/' + project_id, {
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
      }, [formSubmitted]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        setFormSubmitted(false);
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
            fetch('http://localhost:3001/api/project-users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name: userFormData.username,
                    project_id: project_id,
                    permission_id: userFormData.permission
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
    
        setUserFormData({
            username: '',
            permission: 1
        });
      };

    return (
        <>
            <Button variant="primary me-2" onClick={handleShow}>
                <i class="bi bi-people-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Team Members</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row mb-3">
                        <div class="col-auto">
                            <input disabled={permission_id < 3} type="text" name="username" value={userFormData.username} onChange={handleInputChange} class="form-control" placeholder="User name" />
                        </div>
                        <div class="col-auto">
                            <select disabled={permission_id < 3} class="form-select" name="permission" value={userFormData.permission} onChange={handleInputChange}>
                                <option key="1" value="1">read-only</option>
                                <option key="2" value="2">read-write</option>
                                <option key="3" value="3">admin</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button disabled={permission_id < 3} class="btn btn-primary" onClick={handleSubmit}><i class="bi bi-person-plus-fill"></i></button>
                        </div>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Permission</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data !== null ? data.map((item, index) => (
                            <MemberRow
                                key={item.id}
                                project_id={project_id}
                                user_id={item.user_id}
                                user_name={item.user_name}
                                permission_id={item.permission_id}
                                setFormSubmitted={setFormSubmitted}
                                formSubmitted={formSubmitted}
                                login_permission={permission_id}
                            />
                            )) : <></>}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>            
        </>
    )
}

export default Members;