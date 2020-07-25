const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
    {
        name: {
            type: Array,
            required: [true, 'Must have data to create model']
        }
    }
);


const Result = mongoose.model('Result', resultSchema);

module.exports = Result;