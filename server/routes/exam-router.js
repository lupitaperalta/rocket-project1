const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/exams', ItemController.getItems);
router.get('/exams/:id', ItemController.getItemById);
router.post('/exams/create', ItemController.createItem);
router.put('/exam/:id', ItemController.updateItem);
router.delete('/admin/:id', ItemController.deleteItem);

module.exports = router;
