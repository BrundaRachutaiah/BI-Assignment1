import React from 'react';
import { useParams } from 'react-router-dom';
import CourseSidebar from './CourseSidebar';

const Lesson = () => {
const { id } = useParams();

// Function to get lesson content based on ID
const getLessonContent = (lessonId) => {
switch(lessonId) {
case '13':
return {
title: "BI_Assignment 1",
type: "assignment",
content: "Create a frontend application that displays meetup events using the provided backend API."
};
default:
return {
title: "Lesson Content",
type: "video",
content: "Video lesson content will be displayed here."
};
}
};

const lesson = getLessonContent(id);

return (
<div className="container-fluid p-0">
<div className="row g-0">
<div className="col-md-3">
<CourseSidebar />
</div>
<div className="col-md-9">
<div className="p-4">
<div className="d-flex justify-content-between align-items-center mb-4">
<h4 className="mb-0">{lesson.title}</h4>
<button className="btn btn-success">
COMPLETE & CONTINUE →
</button>
</div>

<div className="card shadow-sm">
<div className="card-body">
{lesson.type === 'video' ? (
<div className="ratio ratio-16x9">
<div className="bg-dark d-flex align-items-center justify-content-center">
<i className="bi bi-play-circle text-white" style={{ fontSize: '4rem' }}></i>
</div>
</div>
) : (
<div>
<h5>Assignment Details</h5>
<p>{lesson.content}</p>
<div className="mt-4">
<h6>Assignment Requirements:</h6>
<ul>
<li>Use the provided API endpoints.</li>
<li>Implement filtering functionality.</li>
<li>Create a responsive design.</li>
<li>Follow the UI mockups provided.</li>
</ul>
</div>
</div>
)}
</div>
</div>
</div>
</div>
</div>
</div>
);
};

export default Lesson;