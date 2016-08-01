var mongoose = require('mongoose');

// File Schema
var FileSchema = mongoose.Schema({
	file: {
		type: String
	},
	links: {
		type: String
	}
});

var File = module.exports = mongoose.model('File', FileSchema);
