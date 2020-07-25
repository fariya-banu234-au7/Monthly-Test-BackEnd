const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then((con) => {
        console.log('MongoDB Connected');
    });

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Is Up On Port ${port}`);
});