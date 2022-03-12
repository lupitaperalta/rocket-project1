const { handle } = require('express/lib/application');
const mongoose = require('mongoose');
// Import exam model
const examModel = require('../models/exam-model.js');
const patientModel = require('../models/patient-model');

mongoose
  //.connect('mongodb://127.0.0.1:27017/items', { useNewUrlParser: true, useFindAndModify: false })
  .connect('mongodb+srv://lupitaperalta:Lokkol11@cluster0.spxa9.mongodb.net/hackCovidTest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;


module.exports = db;
