/**
 * host-api.js
 *
 * API for Elmeron hosts.
 * */

var express = require('express');
var router = express.Router();
var HostHandler = require('../lib/host-handler');


router.get('/', function(req, res) {
	res.send({
		message: "Elmeron Central Host API"
	});
});


router.post('/registerHost', function(req, res) {
	HostHandler.registerHost(req.body.address, req.body.type, function(err) {
		if (err) throw err;
		res.send({
			status: true,
			message: "Host successfully registered"
		});
	});
});


router.get('/getGameHosts', function(req, res) {
	HostHandler.getGameHosts(function(hosts) {
		res.json(hosts);
	});
});


router.get('/getProfileHosts', function(req, res) {
	HostHandler.getProfileHosts(function(hosts) {
		res.json(hosts);
	});
});


module.exports = router;