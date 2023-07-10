import React, { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import './event.css';

function EventPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const location = useLocation();
  const { event , user} = location.state;

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      fetch(`/getMessages?eventTitle=${event.title}`)
      .then((response) => response.json())
      .then((data) => setChatMessages(data))
      .catch((error) => console.log(error));

    } catch (error) {
      console.log(error);
    }
  };



  
  useEffect(() => {
    loadMessages();

  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const message = { sender: user.username, message: newMessage , event: event};
    try {
      const response = await fetch('/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      if (response.ok) {
        setNewMessage('');
        loadMessages(); // Refresh the messages after sending a new message
      } else {
        console.log('Failed to send message');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Header />
      <div className="event-page">
      
      <div className="event-page__content">
        <div className="event-info">
          <div className="event-info-card">
            <h1 className="event-title">{event.title}</h1>
            <p className="event-organizer">Organizer: {event.organizer}</p>
            <p className="event-date">Date: {event.date}</p>
            <p className="event-time">Time: {event.time}</p>
            <p className="event-address">Address: {event.address}</p>
            <p className="event-description">Description: {event.description}</p>
          </div>
          
        </div>
        <div className="chat-room">
          <h2 className="chat-room__title">Chat Room</h2>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message">
                <span className="chat-username">{message.sender}: </span>
                <span className="chat-content">{message.message}</span>
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