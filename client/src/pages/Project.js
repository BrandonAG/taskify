import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import CreateTask from '../components/CreateTask'; 

function Project() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupOn, setPopupOn] = useState(false)
  
  function togglePopup () {
    setPopupOn(!popupOn);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects/' + id, {
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
        console.log("DATA");
        console.log(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Project Page</h1>
      {!popupOn ? <Button onClick={togglePopup}>Add Task</Button> : <></>}
      {popupOn ? <CreateTask toggle={togglePopup} projectID={id} /> : null}
      <Container>
        {data !== null ? data.map((item, index) => (
          <Row>
            <Col>
            <div key={index}>{item.task_name}</div>
            {/* <Link to={{pathname: './project/' + item.project_id}} key={index}>{item.project_name}</Link> */}
            </Col>
          </Row>
        )) : <></>}
      </Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data !== null ? data.map((item, index) => (
            <tr>
            <td>{item.task_name}</td>
            <td>{item.task_description}</td>
            <td>{item.user_name}</td>
            <td>{item.level}</td>
            <td>{item.status}</td>
            </tr>
        )) : <></>}
      </tbody>
    </Table>
    </>
  );
};

export default Project;