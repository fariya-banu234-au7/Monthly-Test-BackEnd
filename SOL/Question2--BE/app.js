const express = require('express');
const excelRouter = require('./routes/excelRoutes');


const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api/v1/result', excelRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});


module.exports = app;