/**
 * host-model.js
 *
 * The Host database model.
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Host', new Schema({
	address: String,
	type: String
}));