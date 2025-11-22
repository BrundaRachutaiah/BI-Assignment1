import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';

const AddEventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Offline',
    date: '',
    time: '',
    image: '',
    hostedBy: '',
    venue: '',
    address: '',
    ticketPrice: 0,
    speakers: [{ name: '', title: '' }],
    description: '',
    tags: '',
    dressCode: 'Casual',
    ageRestriction: 'None',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, type, date, time, image, hostedBy, venue, address, ticketPrice, speakers, description, tags, dressCode, ageRestriction } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for speaker fields
  const handleSpeakerChange = (index, e) => {
    const newSpeakers = [...speakers];
    newSpeakers[index][e.target.name] = e.target.value;
    setFormData({ ...formData, speakers: newSpeakers });
  };

  // Add a new speaker input field
  const addSpeaker = () => {
    setFormData({ ...formData, speakers: [...speakers, { name: '', title: '' }] });
  };

  // Remove a speaker input field
  const removeSpeaker = (index) => {
    const newSpeakers = [...speakers];
    newSpeakers.splice(index, 1);
    setFormData({ ...formData, speakers: newSpeakers });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!title || !date || !time || !image || !hostedBy || !description) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    
    // Conditional validation for offline events
    if (type === 'Offline' && (!venue || !address)) {
      setError('Venue and Address are required for offline events.');
      setLoading(false);
      return;
    }

    // Prepare data for API
    const eventData = {
      ...formData,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Convert comma-separated string to array
      ticketPrice: Number(ticketPrice), // Ensure ticketPrice is a number
    };

    try {
      await createEvent(eventData);
      // On success, navigate to the home page
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Add New Event</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  {/* Title */}
                  <div className="col-md-12">
                    <label htmlFor="title" className="form-label">Event Title *</label>
                    <input type="text" className="form-control" id="title" name="title" value={title} onChange={onChange} required />
                  </div>

                  {/* Type and Date */}
                  <div className="col-md-4">
                    <label htmlFor="type" className="form-label">Event Type *</label>
                    <select className="form-select" id="type" name="type" value={type} onChange={onChange} required>
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="date" className="form-label">Date *</label>
                    <input type="date" className="form-control" id="date" name="date" value={date} onChange={onChange} required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="time" className="form-label">Time *</label>
                    <input type="text" className="form-control" id="time" name="time" value={time} onChange={onChange} placeholder="e.g., 10:00 - 12:00" required />
                  </div>
                  
                  {/* Image and Host */}
                  <div className="col-md-8">
                    <label htmlFor="image" className="form-label">Image URL *</label>
                    <input type="text" className="form-control" id="image" name="image" value={image} onChange={onChange} placeholder="https://..." required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="hostedBy" className="form-label">Hosted By *</label>
                    <input type="text" className="form-control" id="hostedBy" name="hostedBy" value={hostedBy} onChange={onChange} required />
                  </div>

                  {/* Conditional Venue and Address for Offline Events */}
                  {type === 'Offline' && (
                    <>
                      <div className="col-md-6">
                        <label htmlFor="venue" className="form-label">Venue *</label>
                        <input type="text" className="form-control" id="venue" name="venue" value={venue} onChange={onChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Address *</label>
                        <input type="text" className="form-control" id="address" name="address" value={address} onChange={onChange} required />
                      </div>
                    </>
                  )}

                  {/* Ticket Price and Dress Code */}
                  <div className="col-md-4">
                    <label htmlFor="ticketPrice" className="form-label">Ticket Price *</label>
                    <input type="number" className="form-control" id="ticketPrice" name="ticketPrice" value={ticketPrice} onChange={onChange} min="0" required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="dressCode" className="form-label">Dress Code</label>
                    <input type="text" className="form-control" id="dressCode" name="dressCode" value={dressCode} onChange={onChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="ageRestriction" className="form-label">Age Restriction</label>
                    <input type="text" className="form-control" id="ageRestriction" name="ageRestriction" value={ageRestriction} onChange={onChange} />
                  </div>
                  
                  {/* Speakers */}
                  <div className="col-12">
                    <label className="form-label">Speakers *</label>
                    {speakers.map((speaker, index) => (
                      <div key={index} className="row g-2 mb-2">
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="Name" name="name" value={speaker.name} onChange={(e) => handleSpeakerChange(index, e)} required />
                        </div>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="Title" name="title" value={speaker.title} onChange={(e) => handleSpeakerChange(index, e)} required />
                        </div>
                        <div className="col-md-2">
                          <button type="button" className="btn btn-danger btn-sm w-100" onClick={() => removeSpeaker(index)} disabled={speakers.length === 1}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={addSpeaker}>+ Add Another Speaker</button>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">Description *</label>
                    <textarea className="form-control" id="description" name="description" rows="4" value={description} onChange={onChange} required></textarea>
                  </div>

                  {/* Tags */}
                  <div className="col-12">
                    <label htmlFor="tags" className="form-label">Tags *</label>
                    <input type="text" className="form-control" id="tags" name="tags" value={tags} onChange={onChange} placeholder="e.g., javascript, react, workshop (comma-separated)" required />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;