/**
 * host-handler.js
 * */


var mongoose = require('mongoose');
var config = require('../config');
var assert = require('assert');
var HostModel = require('../models/host-model');


/**
 * Available Host types.
 * */
var Types = ['GAME', 'PROFILE'];


/**
 * Database initialization.
 * */
mongoose.connect(config.database);

// on successful connection
mongoose.connection.on('connected', function() {
	console.log('database connected to url: ' + config.database);
});

// on connection error
mongoose.connection.on('error', function(err) {
	throw err;
});

// when disconnected
mongoose.connection.on('disconnected', function() {
	console.log('database disconnected');
});

// if the Node process ends
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('database closed through node');
		process.exit(0);
	});
});



/**
 * Registers a remote Elmeron Host to the database.
 *
 * @param {String} address - The IP address of the host
 * @param {Object} type - What type of host this is
 * @param {function} cb - Callback with any error
 * */
exports.registerHost = function(address, type, cb) {
	assert(typeof address == 'string', 'address must be a string');
	assert(typeof type == 'string', 'type must be a string');
	assert(cb !== null, 'no callback');
	assert(Types.indexOf(type) != -1, 'invalid host type');

	var host = new HostModel({
		address: address,
		type: type
	});

	host.save(function(err) {
		if (err) cb(err);
		else cb(null);
	});
};


/**
 * Returns all Game Hosts in the database.
 *
 * @param {function} cb
 * */
exports.getGameHosts = function(cb) {
	assert(cb !== null, 'no callback');

	getHosts('GAME', function(hosts) {
		cb(hosts);
	});
};


/**
 * Returns all Profile Hosts in the database.
 *
 * @param {function} cb
 * */
exports.getProfileHosts = function(cb) {
	assert(cb !== null, 'no callback');

	getHosts('PROFILE', function(hosts) {
		cb(hosts);
	});
};


/**
 * Returns all hosts with a specific type.
 *
 * @param {String} hostType - What type of host to query
 * @param {function} cb - Callback with the hosts found
 * */
var getHosts = function(hostType, cb) {
	assert(typeof hostType == 'string', 'host type must be a string');
	assert(cb !== null, 'no callback');

	HostModel.find({ type: hostType }, function(err, hosts) {
		if (err) throw err;
		cb(hosts);
	});
};


module.exports = exports;