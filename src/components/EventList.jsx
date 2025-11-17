import React, { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import EventCard from './EventCard';
import FilterBar from './FilterBar';

const EventList = () => {
  const [eventType, setEventType] = useState('Both');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Use relative URL
  const API_URL = '/events';
  const { data: events, loading, error } = useFetch(API_URL);

  useEffect(() => {
    if (events) {
      let filtered = [...events];

      if (eventType !== 'Both') {
        filtered = filtered.filter(event => event.type === eventType);
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(event => 
          event.title.toLowerCase().includes(term) || 
          event.tags.some(tag => tag.toLowerCase().includes(term)) ||
          event.hostedBy.toLowerCase().includes(term)
        );
      }

      setFilteredEvents(filtered);
    }
  }, [events, eventType, searchTerm]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Meetup Events</h1>
        <span className="badge bg-secondary p-2">
          <i className="bi bi-building me-1"></i> Startup
        </span>
      </div>
      
      <FilterBar 
        onFilterChange={setEventType}
        onSearchChange={setSearchTerm}
      />

      {filteredEvents.length === 0 ? (
        <div className="text-center my-5">
          <h3>No events found</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="row">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;