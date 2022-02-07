const express = require('express');
const router = express.Router();

// Require controller module for exams
var exam_controller = require('../controllers/exam-controller');

// Exams home page 
router.get('/', (req, res) => {
    res.send('Currently on the patient page')
});









module.exports = router;