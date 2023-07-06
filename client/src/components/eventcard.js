import React from 'react'
import './eventcard.css';

function EventCard({event}) {
    const { title, description, date, time, location } = event;

    return (
        <div className="event-card">
          <h3 className="event-card__title">{title}</h3>
          <p className="event-card__description">{description}</p>
          <p className="event-card__date">{date}</p>
          <p className="event-card__time">{time}</p>
          <p className="event-card__location">{location}</p>
        </div>
      );
}

export default EventCard
