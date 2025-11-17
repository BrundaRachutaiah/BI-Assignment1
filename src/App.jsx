// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import Lesson from './components/Lesson';
import AddEventForm from './components/AddEventForm'; // <-- 1. IMPORT THE NEW COMPONENT
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/add-event" element={<AddEventForm />} /> {/* <-- 2. ADD THE NEW ROUTE */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;