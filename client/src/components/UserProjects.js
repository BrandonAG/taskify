import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import CreateProject from '../components/CreateProject'; 

const UserProjects = () => {
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
        const response = await fetch('http://localhost:3001/api/projects', {
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
      <h1>Projects</h1>
      {!popupOn ? <Button onClick={togglePopup}>Add Project</Button> : <></>}
      {popupOn ? <CreateProject toggle={togglePopup} /> : null}
      <Container>
        {data !== null ? data.map((item, index) => (
          <Row>
            <Col>
            <Link to={{pathname: './project/' + item.project_id}} key={index}>{item.project_name}</Link>
            </Col>
          </Row>
          
        )) : <></>}
      </Container>
    </>
    
  );
};

export default UserProjects;