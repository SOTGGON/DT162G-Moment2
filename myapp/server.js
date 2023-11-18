const express = require('express');
const app = express();
const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

const courses = require('./data/courses.json');

app.use(cors());

// Visa alla kurser
app.get('/courses', (req, res) => {
    res.json(courses); // Returnera alla kurser som JSON
});

// Visa en enskild kurs baserat på ID
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(course => course.id === parseInt(id));
    if (!course) return res.status(404).send('Kursen hittades inte.');
    res.json(course);
});    

// Radera en kurs baserat på ID
app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    const courseIndex = courses.findIndex(course => course.id === parseInt(id));
    if (courseIndex === -1) return res.status(404).send('Kursen hittades inte.');
    courses.splice(courseIndex, 1);
    res.send('Kursen har raderats.');
});

/* Om ska radera data från json också
app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    const courseIndex = courses.findIndex(course => course.id === parseInt(id));
    if (courseIndex === -1) return res.status(404).send('Kursen hittades inte.');
  
    // Remove the course from the in-memory array
    const deletedCourse = courses.splice(courseIndex, 1)[0]; // Splice returns an array; get the deleted course
  
    // Write the updated courses array back to the JSON file
    const coursesPath = path.join(__dirname, 'data', 'courses.json');
    fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2));
  
    res.json({ message: 'Kursen har raderats', deletedCourse });
});
*/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servern är igång på port ${PORT}`);
});
