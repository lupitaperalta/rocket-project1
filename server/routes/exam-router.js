const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

// This route is /exams and will get all exams from the exams db
router.get('/', ItemController.getItems);

// /exams/:id will get the specific exam from its id in the exams db
router.get('/:id', ItemController.getItemById);

module.exports = router;
