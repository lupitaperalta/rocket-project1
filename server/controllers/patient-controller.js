/* eslint-disable no-undef, arrow-body-style */
const Patient = require('../models/patient-model');

getPatients = async (req, res) => {
  await Patient.find({}, (err, patients) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getPatients': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!patients.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getPatients': Patient not found`);
      return res.status(200).json({
        success: true,
        patients: [],
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getPatients': Patients fetched!`);
    return res.status(200).json({
      success: true,
      patients: patients,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getPatients': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

getPatientById = async (req, res) => {
  await Patient.find({ _id: req.params.id }, (err, patients) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getPatientById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!patients.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getPatientById': Patient not found`);
      return res.status(404).json({
        success: false,
        error: 'Patient not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getPatientById': Patient fetched!`);
    return res.status(200).json({
      success: true,
      patient: patients[0],
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'getPatientById': ${err}`);
    console.error(err);
    return err;
  });
};

createPatient= (req, res) => {
  const body = req.body;
  // console.log('----------------------- createItem: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createItem: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a patient.',
    });
  }

  const patient = new Patient(body);

  if (!patient) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createPatient': 'patient' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'patient' is malformed",
    });
  }

  // console.log('----------------------- createItem: item -----------------------')
  // console.log(item);

  return patient
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createPatient': Patient created!`);
      return res.status(201).json({
        success: true,
        id: patient._id,
        message: 'Patient created!',
      });
    })
    .catch(err => {
      console.error(`[Hack.Diversity React Template] - caught error in 'createPatient'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
        console.error(
          `[Hack.Diversity React Template] => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

updatePatient = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`[Hack.Diversity React Template] - 400 in 'updatePatient': You must provide a patient to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide a patient to update.',
    });
  }

  const patientForUpdate = {
    _id: req.params.id,
    patientId: body.patientId,
    age: body.age,
    sex: body.sex,
    race: body.race,
    zip: body.zip,
  };

  // console.log('----------------------- updateItem: res -----------------------');
  // console.log(res);

  try {
    await Patient.findOneAndUpdate({ _id: req.params.id }, patientForUpdate);
  } catch (err) {
    console.error(`[Hack.Diversity React Template] - caught error in 'updatePatient': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`[Hack.Diversity React Template] - 200 in 'updatePatient': Patient updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'Patient updated!',
  });
};

deletePatient = async (req, res) => {
  await Patient.findOneAndDelete({ _id: req.params.id }, (err, patient) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deletePatient': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!patient) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deletePatient': Patient not found!`);
      return res.status(400).json({
        success: false,
        error: 'Patient not found!',
      });
    }

    return res.status(200).json({
      success: true,
      patient: patient,
    });
  }).catch(err => {
    console.error(`[Hack.Diversity React Template] - caught error in 'deletePatient': ${err}`);
    console.error(err);
    return err;
  });
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
