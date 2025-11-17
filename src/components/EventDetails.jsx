import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../useFetch';

const EventDetails = () => {
  const { id } = useParams();
  // Use relative URL
  const API_URL = `/events/${id}`;
  const { data: event, loading, error } = useFetch(API_URL);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error || 'Event not found.'}
        </div>
        <Link to="/" className="btn btn-primary">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img src={event.image} className="img-fluid rounded" alt={event.title} />
        </div>
        <div className="col-md-6">
          <h2>{event.title}</h2>
          <div className="mb-3">
            <span className={`badge ${event.type === 'Online' ? 'bg-success' : 'bg-danger'} me-2`}>
              {event.type}
            </span>
            {event.tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </div>
          
          <div className="mb-3">
            <h5>Event Details</h5>
            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            <p><strong>Time:</strong> {event.time}</p>
            {event.type === 'Offline' && (
              <>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Address:</strong> {event.address}</p>
              </>
            )}
            <p><strong>Hosted By:</strong> {event.hostedBy}</p>
            <p><strong>Ticket Price:</strong> {event.ticketPrice === 0 ? 'Free' : `₹${event.ticketPrice}`}</p>
          </div>
          
          <div className="mb-3">
            <h5>Speakers</h5>
            {event.speakers.map((speaker, index) => (
              <p key={index}>
                <strong>{speaker.name}</strong> - {speaker.title}
              </p>
            ))}
          </div>
          
          <div className="mb-3">
            <h5>Description</h5>
            <p>{event.description}</p>
          </div>
          
          <div className="mb-3">
            <h5>Additional Information</h5>
            <p><strong>Dress Code:</strong> {event.dressCode}</p>
            <p><strong>Age Restriction:</strong> {event.ageRestriction}</p>
          </div>
          
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-outline-primary">Back to Events</Link>
            <button className="btn btn-primary">RSVP Now</button>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <h4>Event Gallery</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <img src={event.image} className="img-fluid rounded" alt="Event venue" />
            </div>
            <div className="col-md-4 mb-3">
              <img src={event.image} className="img-fluid rounded" alt="Event venue" />
            </div>
            <div className="col-md-4 mb-3">
              <img src={event.image} className="img-fluid rounded" alt="Event venue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;