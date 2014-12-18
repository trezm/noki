var settings = require('../settings.js');
var friendjs = require('friendjs');
var PageControllerRoutes = require('../app/controllers/page_controller').PageControllerRoutes;

module.exports.router = function(app) {
	app.use(
		function(req, res, next) {
			if (settings.LOG_LEVEL > 1) {
				console.log(req.method + " ->", req.path);
			}
			next();
		});

	// Set up Users and Friends
	friendjs.routes(app);

	app.post('/page', friendjs.validate, PageControllerRoutes.create);
	app.put('/pages/:title', friendjs.validate, PageControllerRoutes.update);
	app.get('/pages/:title', friendjs.validate, PageControllerRoutes.read);
	app.get('/pages', friendjs.validate, PageControllerRoutes.readQuery);

	app.get('/*', function(req, res) {
		res.sendfile('./dist/' + req.path);
	});
}