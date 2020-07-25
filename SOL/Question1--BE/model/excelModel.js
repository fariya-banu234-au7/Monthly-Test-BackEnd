const mongoose = require('mongoose');
const validator = require('validator');

const excelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Must input  name']
        },
        email: {
            type: String,
            required: [true, 'YOu must enter email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Provide valid email']
        },
        phone_number: {
            type: String,
            required: [true, 'User must input  name']
        },

        age: {
            type: String,
            required: [true, 'User must input age']
        },
        gender: {
            type: String,
            required: [true, 'User must input  gender']
        },
        address: {
            type: String,
            required: [true, 'User must input  Address']
        }
    }
);


const Excel = mongoose.model('Excel', excelSchema);

module.exports = Excel;