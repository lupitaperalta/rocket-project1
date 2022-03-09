const express = require('express');

const PatientController = require('../controllers/patient-controller');

const router = express.Router();

router.get('/', PatientController.getPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.createPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;
