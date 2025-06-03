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

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    };

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users', {
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
        console.log(json.user_id);
        setUser(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchUser();
  }, [location]);

  return (
    <>
      <Navigation />
      <Container>
        <h1>Project Page</h1>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0 ms-2 text-start">
            {user !== null ?
              <CreateTask projectID={location.state.project_id} userID={user[0].id} /> : <></>}
          </div>
          <div className="col-md-3 text-end me-2">
            <Members project_id={location.state.project_id} />
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
            <tr class="align-middle">
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
                />
                <DeleteTask task_id={item.id} task_name={item.task_name}/>
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