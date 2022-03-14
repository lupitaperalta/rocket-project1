const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema(
    {
        patientId: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        sex: {
            type: String,
            required: true
        },
        race: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('patient', patientSchema);
