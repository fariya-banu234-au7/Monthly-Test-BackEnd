const Result = require('../model/excelModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const fetch = require("node-fetch")
const { createReadStream } = require('fs');




exports.createResult = async (req, res) => {
    try {
        const results = []
        const result = []
        // const stream = createReadStream('input.txt');

        const taskArray = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/comments', 'https://jsonplaceholder.typicode.com/todos'];
        for (const array of taskArray) {
            fetch(array)
                .then(res => res.json())
                .then(json => {
                    console.log(json.slice(0, 2))
                    result.push(json.slice(0, 2))
                    Result.create(json.slice(0, 2))
                })
            console.log(result)

        }
        console.log('checking')


        console.log(newResult)
        res.status(201).json({
            status: 'success'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};