const express = require('express');

const ItemController = require('../controllers/patient-controller');

const router = express.Router();

// This route is /patient/:id and will retrieve the patient entry in the patients db
router.get('/:id', ItemController.getItemById);


module.exports = router;