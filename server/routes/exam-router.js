const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/exams', ItemController.getItems);
router.get('/exam/:id', ItemController.getItemById);
router.post('/exam', ItemController.createItem);
router.put('/exam/:id', ItemController.updateItem);
router.delete('/exam/:id', ItemController.deleteItem);

module.exports = router;
