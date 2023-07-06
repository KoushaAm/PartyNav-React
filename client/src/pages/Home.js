import React, {useState, useEffect} from 'react';
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

  // fetch all the events by calling getEvetns from server
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
      <header className="header" style = {{marginTop: "-30px"}}>
        <h2>Welcome {user.username}!</h2>
        <Link to="/makeEvent" state={{ user: user }} className="create-event-button">Create Event</Link>
      </header>


      <div className="grid-container">
        <div className="grid-item">
          <h1>Events</h1>
          <div className="event-card-container"> 
            {events.map((event, index) => (
              <EventCard key={index} style ={{marginTop: "30px"}} event={event} className="event-card" /> 
            ))}
          </div>
        </div>
        <div className="grid-item"><h1>Map</h1>
        <img style = {{width: "100%", height: "70%"}}
        src = "https://www.google.com/maps/vt/data=evQ9F6RNQe8jPLsqzHzb-cXH6u76nvfFDGeFC94iAeoUKTJ_t9cmSfwJ4rJEx_Uj5HAiBlRf4bxvo2TJt8yz3VGANBMwY2LJNxka89oEbRGGHOJuYC9p6_n3pkwjqVcc2ljJqsc-ApT_iWRZYMliKJQCS-Ev9KVg1RP459_VBIew---MHJnIuBq-xejbl9o4V-0qI-6VFsnX5Y5gbrJgx99NsV2ksX9EvMZjhm5OHc1JRNAFe4R3yaKVwL5T">
        </img></div>
      </div>
    </div>
  );
}

export default Home;
