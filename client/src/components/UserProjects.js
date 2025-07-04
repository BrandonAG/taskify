import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import CreateProject from '../components/CreateProject';
import EditProject from '../components/EditProject';
import DeleteProject from '../components/DeleteProject';
import HomeInfo from "./HomeInfo";
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserProjects = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
  }, [formSubmitted]);

  return (
    <>
      <Container>
        <h1 className="text-start ms-2">Projects</h1>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0 ms-2 text-start">
            <CreateProject setFormSubmitted={setFormSubmitted} />
          </div>
          <div className="col-md-3 text-end me-2">
            <HomeInfo />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {data !== null ? data.map((item, index) => (
              <tr>
                <td className="align-middle"><Link to={{pathname: './project'}} state={{ project_id: item.project_id, project_name: item.project_name }} key={index}>{item.project_name}</Link></td>
                <td>
                    <EditProject project_id={item.project_id} project_name={item.project_name} permission_id={item.permission_id} setFormSubmitted={setFormSubmitted} />
                    <DeleteProject project_id={item.project_id} project_name={item.project_name} permission_id={item.permission_id} setFormSubmitted={setFormSubmitted} />
                </td>
              </tr>
              
            )) : <></>}
          </tbody>
        </Table>
      </Container>
    </>
    
  );
};

export default UserProjects;