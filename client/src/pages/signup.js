import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import './signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Send the user registration data to your Express server
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      console.log('User registered');
      setMessage('Registration successful. Redirecting to login page...');

      setTimeout(() => navigate('/login'), 2000);
    } else {
      console.error('Error registering user');
    }
  };

  return (
    <div>
      <Header />
      
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="signup-title">Signup</h2>
          {message && <p className="message">{message}</p>}
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                UserName:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
