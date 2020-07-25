import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then((con) => {
        console.log('DATABSE Connected Successfully');
    });

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on :: ${port}`);
});