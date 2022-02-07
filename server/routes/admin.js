const express = require('express');
const router = express.Router();

// Require controller module for exams
var exam_controller = require('../controllers/exam-controller');

// Exams home page 
router.get('/', (req, res) => {
    res.send('Currently on the admin page')
});

// GET request to get all items
router.get('/admin', exam_controller.getItems);

// GET request to 







module.exports = router;