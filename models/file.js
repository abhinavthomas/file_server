var mongoose = require('mongoose');

// File Schema
var FileSchema = mongoose.Schema({
	file: {
		type: String,
		index:true
	},
	links: {
		type: String
	},
	is_link: {
		type: Boolean
	}
});

var File = module.exports = mongoose.model('File', FileSchema);
