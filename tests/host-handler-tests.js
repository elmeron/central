var HostHandler = require('../lib/host-handler');


exports.registerHostTest = function(test) {
	HostHandler.registerHost('123', 'GAME', function(err) {
		test.ifError(err);
		test.done();
	})
};