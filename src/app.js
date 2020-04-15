var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const log = require('./log');
var purchaseRouter = require('./routes/purchase');
var userRouter = require('./routes/user');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(config.mongodb.uri, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/purchase', purchaseRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(
    config.logDebug ? err : {}
  );
});

module.exports = app;
