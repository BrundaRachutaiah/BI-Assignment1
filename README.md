# Meetup Events App

A full-stack event management app where you can browse, filter, add, and view detailed meetup events.
Built with a **React** frontend (Vite), **Express/Node** backend, and **MongoDB** database — deployed on Vercel.

---

## 🔗 Demo Link

**Live Demo:** [https://meet-up-back.vercel.app](https://meet-up-back.vercel.app)

---

## ⚡ Quick Start

```bash
git clone https://github.com/<your-username>/BI-Assignment1.git
cd BI-Assignment1
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## 🛠️ Technologies

| Layer      | Tech                            |
|------------|---------------------------------|
| Frontend   | React 19, React Router DOM v7   |
| Bundler    | Vite 5                          |
| Backend    | Node.js, Express                |
| Database   | MongoDB                         |
| Deployment | Vercel                          |
| Styling    | Bootstrap 5, Bootstrap Icons    |

---

## ✨ Features

### 🏠 Home / Event Listing
- Displays all meetup events in a responsive card grid
- Real-time search by **title**, **tags**, or **host name**
- Filter events by type: **Online**, **Offline**, or **Both**

### 📋 Event Details
- View full event info: date, time, venue, address, ticket price
- Speaker profiles with name, title, and image
- Tags, dress code, age restriction
- Event gallery section

### ➕ Add New Event
- Form to create a new event with full validation
- Supports dynamic speaker fields (add/remove multiple speakers)
- Conditional venue/address fields for Offline events
- Comma-separated tag input

### 🧭 Course Sidebar (Assignment Context)
- Built-in course navigation sidebar (`/lesson/:id`)
- Tracks lesson completion state
- Assignment requirements viewer

---

## 📁 Project Structure

```
BI-Assignment1-main/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddEventForm.jsx     # Create new event form
│   │   ├── CourseSidebar.jsx    # Course module navigation
│   │   ├── EventCard.jsx        # Single event card component
│   │   ├── EventDetails.jsx     # Full event detail view
│   │   ├── EventList.jsx        # Main events listing with filters
│   │   ├── FilterBar.jsx        # Search + type filter bar
│   │   ├── Lesson.jsx           # Lesson viewer with sidebar
│   │   └── Navbar.jsx           # Top navigation bar
│   ├── App.jsx                  # Root component + routes
│   ├── App.css
│   ├── api.js                   # Centralized API functions
│   ├── useFetch.js              # Custom data-fetching hook
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🌐 API Reference

Base URL: `https://meet-up-back.vercel.app/api`

### `GET /api/events`
Returns a list of all events.

**Sample Response:**
```json
[
  {
    "_id": "abc123",
    "title": "React Workshop 2025",
    "type": "Offline",
    "date": "2025-12-01",
    "time": "10:00 AM - 1:00 PM",
    "hostedBy": "TechHub",
    "ticketPrice": 0,
    "tags": ["react", "javascript"],
    "description": "An in-depth hands-on React workshop..."
  }
]
```

---

### `GET /api/events/:id`
Returns full details for a single event.

**Sample Response:**
```json
{
  "_id": "abc123",
  "title": "React Workshop 2025",
  "venue": "Innovation Center",
  "address": "123 Tech Street, Bengaluru",
  "speakers": [
    { "name": "Jane Doe", "title": "Senior Engineer", "image": "https://..." }
  ],
  "dressCode": "Casual",
  "ageRestriction": "None"
}
```

---

### `POST /api/events`
Creates a new event.

**Request Body:**
```json
{
  "title": "AI Meetup",
  "type": "Online",
  "date": "2025-12-15",
  "time": "6:00 PM - 8:00 PM",
  "image": "https://...",
  "hostedBy": "AI Club",
  "ticketPrice": 0,
  "speakers": [{ "name": "John Smith", "title": "AI Researcher", "image": "" }],
  "description": "An online meetup on AI trends.",
  "tags": ["ai", "machine-learning"],
  "dressCode": "Casual",
  "ageRestriction": "None"
}
```

**Sample Response:**
```json
{
  "_id": "xyz789",
  "title": "AI Meetup",
  "type": "Online"
}
```

---

## 🚀 Available Scripts

| Script          | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start development server (Vite)    |
| `npm run build` | Build for production               |
| `npm run preview` | Preview production build         |
| `npm run lint`  | Run ESLint                         |

---

## 📹 Demo Video

Watch a full walkthrough of the app features: [Loom Video Link](#)

---

## 📬 Contact

For bugs or feature requests, please open an issue or reach out at: `brundadr315@gmail.com`
