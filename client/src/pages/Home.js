import React from 'react';
import Header from '../components/header';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';
import EventCard from '../components/eventcard';

class Event {
  constructor(title, description, date, time, location) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.location = location;
  }
}

function Home() {
  const location = useLocation();
  const { user } = location.state;

  const dummyEvent = new Event(
    "Block Party",
    "DJ and Drinks with friends",
    "July 5th",
    "9:00 pm - 2:00 am",
    "Vancouver, BC"
  );

  return (
    <div>
      <Header />
      <header className="header" style = {{marginTop: "-50px"}}>
        <h2>Welcome {user.username}!</h2>
        <Link to="/makeEvent" state={{ user: user }} className="create-event-button">Create Event</Link>
      </header>


      <div className="grid-container">
        <div className="grid-item">
          <h1>Events</h1>
          <EventCard event={dummyEvent} />
        </div>
        <div className="grid-item"><h1>Map</h1></div>
      </div>
    </div>
  );
}

export default Home;
