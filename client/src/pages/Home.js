import React, { useState, useEffect } from "react";
import LoginForm from '../components/LoginForm';
import UserProjects from '../components/UserProjects';
import Navigation from '../components/Nav';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  }, [isLoggedIn]);

  return (
    <section className="text-center container">
      {data !== null ? <><Navigation /><UserProjects /></> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
    </section>
  );
};

export default Home;