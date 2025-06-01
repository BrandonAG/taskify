import React, { useState, useEffect } from "react";
import LoginForm from '../components/LoginForm';
import UserProjects from '../components/UserProjects';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <section className="text-center container">
      { console.log("HOME DATA " + data) }
      {data !== null ? <UserProjects /> : <LoginForm />}
    </section>
  );
};

export default Home;