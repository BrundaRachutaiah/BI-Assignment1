const API_BASE_URL = 'https://meet-up-back.vercel.app/api';

export const fetchEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  return data.success ? data.data : data;
};

export const fetchEventById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  const data = await response.json();
  return data.success ? data.data : data;
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create event');
  }
  const data = await response.json();
  return data.success ? data.data : data;
};