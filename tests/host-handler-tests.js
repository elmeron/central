var mongoose = require('mongoose');
var config = require('../config');
var HostHandler = require('../lib/host-handler');


exports.setUp = function(done) {
	mongoose.connect(config.database);
	done();
};


exports.registerHostTest = function(test) {
	HostHandler.registerHost('123', 'GAME', function(err) {
		test.ifError(err);
		test.done();
	});

};


exports.tearDown = function(done) {
	mongoose.connection.close();
	done();
};