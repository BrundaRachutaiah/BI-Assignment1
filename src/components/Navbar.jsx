// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* --- CHANGE IS HERE --- */}
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Meetup Events
        </Link>
        
        <div className="ms-auto">
          <Link to="/add-event" className="btn btn-light btn-sm">
            Add Event
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;