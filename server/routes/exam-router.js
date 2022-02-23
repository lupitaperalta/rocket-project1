const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/', ItemController.getItems);
router.get('/:id', ItemController.getItemById);
router.post('/create', ItemController.createItem);
router.put('/exam/:id', ItemController.updateItem);
router.delete('/admin/:id', ItemController.deleteItem);

module.exports = router;
