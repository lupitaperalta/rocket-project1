const express = require('express');

const ItemController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/admin', ItemController.getItems);
router.get('/admin/:id', ItemController.getItemById);
router.post('/admin', ItemController.createItem);
router.put('/admin/:id', ItemController.updateItem);
router.delete('/admin/:id', ItemController.deleteItem);


module.exports = router;