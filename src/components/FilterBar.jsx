import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSearchChange }) => {
  const [eventType, setEventType] = useState('Both');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setEventType(value);
    onFilterChange(value);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="col-md-6">
        <select className="form-select" value={eventType} onChange={handleTypeChange}>
          <option value="Both">Select Event Type</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;