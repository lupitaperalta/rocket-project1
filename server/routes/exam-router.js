const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

// This route is /exams and will get all exams from the exams db
router.get('/', ItemController.getItems);

// /exams/:id will get the specific exam from its id in the exams db
router.get('/:id', ItemController.getItemById);

// /exams/:id post request will create a new exam
router.post('/', ItemController.createItem);

// /exams/:id put request will update an existing exam
router.put('/:id', ItemController.updateItem);

// /exams/:id delete request will get rid of the exam
router.delete('/:id', ItemController.deleteItem);


module.exports = router;
