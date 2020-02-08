const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const dbConnection = {
    development: process.env.DB_CONNECTION_DEV,
    test: process.env.DB_CONNECTION_TEST,
    staging: process.env.DB_CONNECTION,
    production: process.env.DB_CONNECTION,
}

mongoose.connect(dbConnection[process.env.NODE_ENV],
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(() => process.exit(1));

