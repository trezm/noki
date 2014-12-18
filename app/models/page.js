var settings = require('../../settings');
var mongoose = require('mongoose')
var PageSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true,
		dropDups: true,
		sparse: true
	},

	underscoredTitle: {
		type: String,
		unique: true,
		dropDups: true,
		sparse: true
	},

	body: {
		type: String
	},

	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},

	createdAt: {
		type: Date, 
		default: (new Date()).setDate((new Date()).getDate() + 28)
	},

	lastEditedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},

	editedAt: {
		type: Date, 
		default: (new Date()).setDate((new Date()).getDate() + 28)
	},
});

var Page = mongoose.model('Page', PageSchema);
module.exports = Page;
