// src/components/CourseSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CourseSidebar = () => {
  const location = useLocation();
  
  const courseModules = [
    {
      id: 1,
      title: "Backend Integration",
      lessons: [
        { id: 11, title: "Introduction to Backend Integration", type: "video", completed: true },
        { id: 12, title: "Setting up API Endpoints", type: "video", completed: true },
        { id: 13, title: "BI_Assignment 1", type: "assignment", completed: false, current: true },
        { id: 14, title: "Database Integration", type: "video", completed: false },
        { id: 15, title: "Authentication & Authorization", type: "video", completed: false },
      ]
    },
    {
      id: 2,
      title: "Frontend Development",
      lessons: [
        { id: 21, title: "React Basics", type: "video", completed: false },
        { id: 22, title: "State Management", type: "video", completed: false },
        { id: 23, title: "Frontend Assignment", type: "assignment", completed: false },
      ]
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'video': return <i className="bi bi-play-circle me-2"></i>;
      case 'assignment': return <i className="bi bi-file-earmark-text me-2"></i>;
      default: return <i className="bi bi-file-earmark me-2"></i>;
    }
  };

  return (
    <div className="course-sidebar bg-light p-3" style={{ minHeight: '100vh' }}>
      <h5 className="mb-3">Course Content</h5>
      
      {courseModules.map(module => (
        <div key={module.id} className="mb-4">
          <h6 className="text-muted mb-2">{module.title}</h6>
          <div className="list-group">
            {module.lessons.map(lesson => (
              <Link 
                key={lesson.id} 
                to={`/lesson/${lesson.id}`}
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  lesson.current ? 'active' : ''
                }`}
              >
                {getIcon(lesson.type)}
                <span className={lesson.completed ? 'text-decoration-line-through' : ''}>
                  {lesson.title}
                </span>
                {lesson.completed && <i className="bi bi-check-circle-fill text-success ms-auto"></i>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseSidebar;