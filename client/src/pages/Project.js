import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import CreateTask from '../components/CreateTask';
import TaskInfo from "../components/TaskInfo";
import Members from "../components/Members";
import Navigation from '../components/Nav';
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";

function Project() {
  const location = useLocation();

  if (location.state == null) {
    window.location.href = "/";
  }

  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects/' + location.state.project_id, {
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

      try {
        const response = await fetch('http://localhost:3001/api/project-users/permission/' + location.state.project_id, {
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
        if (json.length === 0) {
          window.location.href = "/";
        }
        setUser(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(() => fetchData(), 2000);
    return () => {
      clearInterval(interval);
    }
  }, [location, formSubmitted]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1>Project: {location.state !== null ? location.state.project_name : null}</h1>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0 ms-2 text-start">
            {user !== null ?
              <CreateTask
                projectID={location.state.project_id}
                userID={user[0].user_id} permission_id={user[0].permission_id}
                setFormSubmitted={setFormSubmitted} /> : <></>}
          </div>
          <div className="col-md-3 text-middle me-2">
              <input
                class="form-check-input me-2"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label class="form-check-label">
                Hide Completed
              </label>
          </div>
          <div className="col-md-3 text-end me-2">
            {user !== null ?
              <Members project_id={location.state.project_id} permission_id={user[0].permission_id} /> : <></>}
            <TaskInfo />
          </div>
        </div>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {user !== null ? data.map((item, index) => (
            <tr hidden={ isChecked && item.status_id === 3 } class="align-middle">
              <td>{item.task_name}</td>
              <td>{item.task_description}</td>
              <td>{item.assigned_to}</td>
              <td>{item.level}</td>
              <td>{item.status}</td>
              <td>
                <EditTask
                  projectID={location.state.project_id}
                  taskID={item.id}
                  task_name={item.task_name}
                  task_description={item.task_description}
                  assigned_to={item.assigned_to_id}
                  priority={item.priority_id}
                  status={item.status_id}
                  permission_id={user[0].permission_id}
                  setFormSubmitted={setFormSubmitted}
                />
                <DeleteTask
                  task_id={item.id}
                  task_name={item.task_name}
                  projectID={location.state.project_id}
                  permission_id={user[0].permission_id}
                  setFormSubmitted={setFormSubmitted}
                />
              </td>
            </tr>
          )) : <></>}
        </tbody>
      </Table>
      </Container>
    </>
  );
};

export default Project;