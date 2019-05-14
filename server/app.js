const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loginRoute = require('./api/routes/auth/login');
const signUpRoute = require('./api/routes/auth/signup');

const mongodb_connection_string = `mongodb://${process.env.MLAB_U}:${process.env.MLAB_PW}@ds121321.mlab.com:21321/ng_everest`;

mongoose.connect(mongodb_connection_string, {
    useNewUrlParser: true
}).then((res) => {
    console.log('Connected to database');
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
app.use('/signup', signUpRoute);

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