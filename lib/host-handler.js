/**
 * host-handler.js
 * */


var config = require('../config');
var assert = require('assert');
var HostModel = require('../models/host-model');


/**
 * Available Host types.
 * */
var Types = ['GAME', 'PROFILE'];



/**
 * Registers a remote Elmeron Host to the database.
 * TODO: this method should require authorization
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


/**
 * Returns the address of a Game Host that is playable.
 * TODO: the Game Host should be the one using the least hardware resources
 *
 * @param {function} cb - Callback with the IP address
 * */
exports.getGameHost = function(cb) {
	getHosts('GAME', function(hosts) {
		cb(hosts[0].address);	// return the first host
	});
};


module.exports = exports;