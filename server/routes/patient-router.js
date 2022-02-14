const express = require('express');

const ItemController = require('../controllers/patient-controller');

const router = express.Router();


router.get('/patient/:id', ItemController.getItemById);


module.exports = router;