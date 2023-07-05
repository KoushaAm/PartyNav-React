import React from 'react';
import { useState } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import Header from '../components/header';
import './signup.css'; // Import the signup.css file

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // recieve the user object from server
    // send it to home page and render homepage
    if (response.ok) {
      const user = await response.json();
      // Redirect to the home page and pass the user object
      navigate('/Home', { state: { user } });
    } else {
      setMessage('Invalid username or password');
    }
    

  };

  return (
    <div>
      <Header />
        <div className="signup-page">
      
          <div className="signup-container">
            <h2 className="signup-title">Login</h2>
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
                value={username}
                onChange={handleNameChange}
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
              Login
            </button>
          </form>
          </div>
      </div>
    </div>
    
  );
}

export default Login;
