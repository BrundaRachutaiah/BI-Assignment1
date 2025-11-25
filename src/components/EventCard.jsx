import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="position-relative">
          <img src={event.image} className="card-img-top" alt={event.title} style={{ height: '200px', objectFit: 'cover' }} />
          <span className={`position-absolute top-0 end-0 m-2 badge ${event.type === 'Online' ? 'bg-success' : 'bg-danger'}`}>
            {event.type}
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text text-muted small">
            <i className="bi bi-calendar-event me-1"></i>
            {formatDate(event.date)}
          </p>
          <p className="card-text text-muted small">
            <i className="bi bi-clock me-1"></i>
            {event.time}
          </p>
          <p className="card-text flex-grow-1">{event.description.substring(0, 100)}...</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bold text-primary">
              {event.ticketPrice === 0 ? 'Free' : `₹${event.ticketPrice}`}
            </span>
            <Link to={`/event/${event._id}`} className="btn btn-primary btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;