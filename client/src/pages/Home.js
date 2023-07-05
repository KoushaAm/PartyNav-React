import React from 'react';
import Header from '../components/header';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div>
      <Header />
      <h2 style = {{marginLeft:"20px"}}>Welcome, {user.username}!</h2>

      <div className="grid-container">
        <div className="grid-item"><h1>Events</h1></div>
        <div className="grid-item"><h1>Map</h1></div>
        {/* <div className="grid-item">Column 3</div> */}
      </div>
    </div>
  );
}

export default Home;
