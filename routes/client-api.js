/**
 * client-api.js
 *
 * API for Elmeron clients.
 * */

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	res.send({
		message: 'Elmeron Central Client API'
	});
});


router.post('/getAccessKey', function(req, res) {
	// TODO: implement
	res.status(501).end();
});


router.post('/getProfile', function(req, res) {
	// TODO: implement
	res.status(501).end();
});


router.post('/getGame', function(req, res) {
	// TODO: implement
	res.status(501).end();
});


module.exports = router;