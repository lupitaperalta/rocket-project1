const express = require('express');

const ItemController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/items', ItemController.getItems);
router.get('/item/:id', ItemController.getItemById);
router.post('/item', ItemController.createItem);
router.put('/item/:id', ItemController.updateItem);
router.delete('/item/:id', ItemController.deleteItem);

module.exports = router;
