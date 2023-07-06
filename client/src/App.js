import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/Home';
import MakeEvent from './pages/makeEvent';
import Header from './components/header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path= "/Home" element={<Home />} />
          <Route path= "/Login" element={<Login />} />
          <Route path= "/signup" element={<Signup />} />
          <Route path= "/makeEvent" element={<MakeEvent />} />

        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
