var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/dbconn', function(req, res, next) {

  mongoose.connect('mongodb://localhost');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.on('open', function(){
		console.log("Successfully opened a connection!");
		res.end("Success!");
	});

	db.close();

});

module.exports = router;