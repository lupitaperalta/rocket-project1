const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        exam_id: new Schema.Types.ObjectId,
        patient_id: new Schema.Types.ObjectId,
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
