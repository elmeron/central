/**
 * 	server.js
 *
 * 	The Central server.
 * */

// TODO: are there enough comments here?
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');

var clientApi = require('./routes/client-api');
var hostApi = require('./routes/host-api');

var port = process.env.PORT || 3000;
app.set('secret', config.secret);
app.set('database', config.database);

// parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// pretty console output
app.use(morgan('dev'));

// api routes
app.use('/client', clientApi);
app.use('/host', hostApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		error: err
	});
});

app.listen(port);