const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        patientId: new Schema.Types.ObjectID,
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
        latestBMI: {
            type: Number,
            required: true
        },
        latestWeight: {
            type: Number,
            required: true
        },
        latestHeight: {
            type: Number,
            required: true
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('item', Item);