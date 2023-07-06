import React from 'react';
import { useState } from 'react';
import Header from '../components/header';
import { useLocation , useNavigate} from 'react-router-dom';
import './makeEvent.css';

function MakeEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const { user } = location.state;
  const navigate = useNavigate();

  const handleOrganizerChange = (event) => {
    setOrganizer(event.target.value);
    };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleaddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    const response = await fetch('/makeEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organizer, title, description, date, time, address }),
    });



    // Reset the form fields after publishing
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setAddress('');

    if (response.ok) {
      
        // set time out
        // navigate to home page
        // pass the user object
        setMessage("Event Created!")
        setTimeout(() => navigate('/Home', { state: { user } }), 3000);
    }
  };

  return (
    <div>
    <Header />

<div className="make-event-container"> 
      
      <div className="make-event-box"> 
        <h1>Create Event</h1>
        <form>
        
         <label htmlFor="address">Organizer:</label>
          <input type="text" id="organizer" value={organizer} onChange={handleOrganizerChange} />

          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />

          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />

          <label htmlFor="date">Date:</label>
          <input type="text" id="date" value={date} onChange={handleDateChange} />

          <label htmlFor="time">Time:</label>
          <input type="text" id="time" value={time} onChange={handleTimeChange} />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={handleaddressChange} />

          
          <button type="button" onClick={handlePublish}>
            Publish
          </button>
          {message && <h2 style = {{color: "green"}}>{message}</h2>}
        </form>
      </div>
    </div>
    </div>
    
  );

}

export default MakeEvent;
