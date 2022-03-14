const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

// This route is /admin/ and will get all exams from the exams db on the admin page
router.get('/', ItemController.getItems);

// /exams/:id will get the specific exam from its id in the exams db
router.get('/:id', ItemController.getItemById);

// Route /admin/create/ will allow an item to be created and inserted into the exams db
router.post('/create', ItemController.createItem);

// Route /admin/exam/:id/update will allow an entry in the exam db to be updated
router.put('/exam/:id/update', ItemController.updateItem);

// Route /admin/:id/delete will delete the selected entry from the exams db
router.delete('/admin/:id/delete', ItemController.deleteItem);

module.exports = router;