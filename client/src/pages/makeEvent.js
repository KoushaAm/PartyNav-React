import React from 'react';
import { useState } from 'react';
import Header from '../components/header';
import { useLocation } from 'react-router-dom';
import './makeEvent.css';

function MakeEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  const location = useLocation();
    const { user } = location.state;


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

  const handlePublish = () => {
    // Here, you can perform the logic to publish the event using the entered information
    // For example, you can create an instance of the Event class and save it to a database

    // Reset the form fields after publishing
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setAddress('');
  };

  return (
    <div>
    <Header />
<div className="make-event-container"> 
      
      <div className="make-event-box"> 
        <h1>Create Event</h1>
        <form>
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
        </form>
      </div>
    </div>
    </div>
    
  );

}

export default MakeEvent;
