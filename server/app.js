const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loginRoute = require('./api/routes/auth/login');

const mongodb_connection_string = 'mongodb+srv://raj:' + process.env.MONGO_ATLAS_PW + '@everest-xvhve.mongodb.net/test?retryWrites=true';

mongoose.connect(mongodb_connection_string, {
    useNewUrlParser: true
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/login', loginRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;