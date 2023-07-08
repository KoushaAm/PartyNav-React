import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import './event.css';

function EventPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const location = useLocation();
  const { event , user} = location.state;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const message = { user: user.username, content: newMessage }; 
    setChatMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div>
      <Header />
      <div className="event-page">
      
      <div className="event-page__content">
        <div className="event-info">
          <h1 className="event-title">{event.title}</h1>
          <p className="event-organizer">Organizer: {event.organizer}</p>
          <p className="event-date">Date: {event.date}</p>
          <p className="event-time">Time: {event.time}</p>
          <p className="event-address">Address: {event.address}</p>
          <p className="event-description">Description: {event.description}</p>
        </div>
        <div className="chat-room">
          <h2 className="chat-room__title">Chat Room</h2>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message">
                <span className="chat-username">{message.user}: </span>
                <span className="chat-content">{message.content}</span>
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="chat-button">Send</button>
          </form>
        </div>
      </div>
    </div>

    </div>
    
  );
}

export default EventPage;