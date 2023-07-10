import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';
import EventCard from '../components/eventcard';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class Event {
  constructor(title, description, date, time, address) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.address = address;
  }
}

function Home() {
  const location = useLocation();
  const { user } = location.state;

  // fetch all the events by calling getEvents from server
  // render all the events in the event card
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/getEvents')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header />
      <header className="header" style={{ marginTop: "-30px" }}>
        <h2>Welcome {user.username}!</h2>
        <Link to="/makeEvent" state={{ user: user }} className="create-event-button">
          Create Event
        </Link>
      </header>

      <div className="grid-container">
        <div className="grid-item">
          <h1>Events</h1>
          <div className="event-card-container">
            {events.map((event, index) => (
              <EventCard key={index} style={{ marginTop: "30px" }} event={event} user={user} className="event-card" />
            ))}
          </div>
        </div>
        <div className="grid-item">
          <h1>Map</h1>
          <LoadScript googleMapsApiKey="AIzaSyD8hGjFl2zc7eEaDpKaGufmEUgkDW8iCHA">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              zoom={13}
              center={{ lat: 49.2827, lng: -123.1207 }} // Vancouver coordinates
            >
              {events.map((event, index) => (
                <Marker key={index} position={event.address} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default Home;
