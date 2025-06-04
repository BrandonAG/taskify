// see SignupForm.js for comments
import React, { useState } from 'react';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

   try {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userFormData.username,
                password: userFormData.password
            }),
        })
        .then((response) => {
            response.json()
        })
        .then((result) => {
            window.location.reload();
        });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  const createAccount = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

   try {
        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userFormData.username,
                password: userFormData.password
            }),
        })
        .then((response) => {
            response.json()
        })
        .then((result) => {
            window.location.reload();
        });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <>
      <main className="form-signin w-100 m-auto">
        <h1>Taskify</h1>
        <form onSubmit={handleFormSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="text" className="form-control" name="username" placeholder='Your username' onChange={handleInputChange}
            value={userFormData.username} />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="password" placeholder='Your password' onChange={handleInputChange}
            value={userFormData.password} />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary my-3 py-2 me-sm-2" type="submit">Sign in</button>
          <button className="btn btn-secondary my-3 py-2" type="button" onClick={createAccount}>Create Account</button>
        </form>
        <p>Keep track of all your project tasks. Add new projects, then add and update tasks</p>
      </main>
    </>
  );
};

export default LoginForm;