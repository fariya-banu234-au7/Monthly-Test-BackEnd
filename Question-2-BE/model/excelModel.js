const mongoose = require('mongoose');
const validator = require('validator');

const resultSchema = new mongoose.Schema(
    {
        data: {
            type: Array,
            required: [true, 'Must have data to create model']
        }
    }
);


const Result = mongoose.model('Result', resultSchema);

module.exports = Result;