const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        examName: {
            type: String,
            required: true
        },
        patientName: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
		keyFindings: {
            type: String,
            required: false
        },
        brixiaScore: {
            type: Number,
            required: false
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('item', Item);
