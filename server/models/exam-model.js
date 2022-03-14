const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        exam_id: {
            type: String,
            required: true
        },
        patient_id: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        key_findings: {
            type: String,
            required: false
        },
        brexia_score: {
            type: Number,
            required: false
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('exams', Exam);
