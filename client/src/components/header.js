import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import the header.css file

function Header() {
  return (
    <header className="header">
      <div>
        <h1 className="title">Find a Party!</h1>
      </div>
      <div className="flex items-center mt-3 md:mt-0">
        {/* <Link to="/home" className="btn-Home">Home</Link> */}
        <Link to="/login" className="btn-signin">Log In</Link>
        <Link to="/signup" className="btn-register">Register</Link>
      </div>
    </header>
  );
}

export default Header;
