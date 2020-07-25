const Result = require('../model/excelModel');
const fetch = require("node-fetch")


exports.createResult = async (req, res) => {
    try {
        const result = []

        const taskArray = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/comments', 'https://jsonplaceholder.typicode.com/todos'];

        // Can be done by promise.all or for loop

        for (const array of taskArray) {
            await fetch(array)
                .then(res => res.json())
                .then(json => {
                    // console.log(json.slice(0, 2))
                    result.push(json.slice(0, 2))
                })
        }
        await console.log(result)


        // Creating a model from result that i have already displayed on console

        const newResult = await Result.create(result)
        // console.log(newResult)
        res.status(201).json({
            status: 'success',
            data: newResult
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};