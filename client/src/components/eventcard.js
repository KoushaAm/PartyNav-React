import React from 'react';
import './eventcard.css';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function EventCard({ event }) {
  const { title, organizer, description, date, time, address } = event;

  return (
    <div className="event-card">
      <h3 className="event-card__title">{title}</h3>
      <p className="event-card__info">
        <FaUser className="event-card__icon" />
        {organizer}
      </p>

      <p className="event-card__info">
        <FaCalendarAlt className="event-card__icon" />
        {date}
      </p>
      
      <p className="event-card__info">
        <FaClock className="event-card__icon" />
        {time}
      </p>
      <p className="event-card__info">
        <FaMapMarkerAlt className="event-card__icon" />
        {address}
      </p>
      

      <p className="event-card__description" style = {{marginLeft: "25px"}}>{description}</p>
      
    </div>
  );
}

export default EventCard;
