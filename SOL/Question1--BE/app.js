const express = require('express');
const excelRouter = require('./routes/excelRoutes');
const path = require('path');

const AppError = require('./utils/appError');
// const globalErrorHandler = require('./controllers/errorController');

const bodyParser = require('body-parser');
const app = express();

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());



app.use('/api/v1/users', excelRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    // 	status: 'fail',
    // 	message: `Cant find ${req.originalUrl} on this server`
    // });
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

// app.use(globalErrorHandler);

module.exports = app;