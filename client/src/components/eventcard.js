import React from 'react';
import './eventcard.css';
import { Link , useNavigate} from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function EventCard({ event , user}) {
  const { title, organizer, description, date, time, address } = event;

  const navigate = useNavigate();

  const handleView = () => {
    navigate('/event', { state: { event, user } });
  };
  

  return (
    <div className="event-card">
      <div className="event-card__header">
        <h3 className="event-card__title">{title}</h3>
          <button className="event-card__button" onClick = {handleView}>View</button>
      </div>
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
