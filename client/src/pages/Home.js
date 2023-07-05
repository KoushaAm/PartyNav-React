import React from 'react';
import Header from '../components/header';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
}

export default Home;
