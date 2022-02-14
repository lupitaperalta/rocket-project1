/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const itemRouter = require('./routes/item-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Importing routes--> our different pages.
const examsRoute = require('./routes/exams');
const adminRoute = require('./routes/admin');
const patientRoute = require('./routes/patient');

//Middleware to use routes.
app.use('/exams', examsRoute);
app.use('/admin', adminRoute);
app.use('/patient', patientRoute);

//The first page you see when launching for the first time
app.get('/', (req, res) => {
    res.send('Hello World! The app is running and is on the home page!');
});


app.use('/api', itemRouter);

//Listening to the server 
app.listen(apiPort, () => {
    console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});
