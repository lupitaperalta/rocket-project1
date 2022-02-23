/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

//Our routers for exams and patients 
const itemRouter = require('./routes/item-router');
const examRouter = require('./routes/exam-router');
const patientRouter = require('./routes/patient-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Middleware to use routes
app.use('/exams', examRouter);
app.use('/admin', adminRoute);
app.use('/patient', patientRouter);

//The first page you see when launching for the first time(backend app)
app.get('/', (req, res) => {
    res.send('Hello World! The app is running and is on the home page!');
});


app.use('/api', itemRouter);

//Listening to the server 
app.listen(apiPort, () => {
    console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});
