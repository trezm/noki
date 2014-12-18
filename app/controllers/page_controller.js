var Page = require('../models/page');
var mongoose = require('mongoose');
var validate = require('petemertz-express-validator');

module.exports.PageController = {
	create: function(params, callback) {
		params.underscoredTitle = params.title.toLowerCase().replace(/\s/g, "_");

		Page.create(params, callback);
	},

	read: function(params, callback) {
		Page.find(params, callback);
	},

	update: function(params, update, callback) {
		update.editedAt = (new Date()).setDate((new Date()).getDate() + 28);

		Page.update(params, {$set: update}, callback);
	},

	destroy: function(params, callback) {
		Page.destroy(params, callback);
	}
}

module.exports.PageControllerRoutes = {
	create: function(req, res) {
		if (validate({
				page: 'required'
			}, req, res)) {
			req.body.page.createdBy = req.currentUser;

			module.exports.PageController.create(
				req.body.page,
				function(error, results) {
					res.json(results);
				})
		}
	},

	read: function(req, res) {
		if (validate({
				title: 'required'
			}, req, res)) {
			module.exports.PageController.read({
					underscoredTitle: req.params.title
				},
				function(error, results) {
					if (results.length > 0) {
						res.json(results[0]);
					} else {
						res.status(404).json({
							error: 'page not found'
						});
					}
				})
		}
	},

	readQuery: function(req, res) {
		if (validate({
				title: 'required'
			}, req, res)) {
			module.exports.PageController.read({
					title: new RegExp('.*' + req.query.title + '.*', "i")
				},
				function(error, results) {
					if (results.length > 0) {
						res.json(results);
					} else {
						res.status(404).json({
							error: 'page not found'
						});
					}
				})
		}
	},

	update: function(req, res) {
		if (validate({
				title: 'required',
				page: 'required'
			}, req, res)) {
			req.body.page.lastEditedBy = req.currentUser._id;

			module.exports.PageController.update({
					underscoredTitle: req.params.title
				},
				req.body.page,
				function(error, results) {
					res.json(results);
				})
		}
	},

	destroy: function(req, res) {}
}