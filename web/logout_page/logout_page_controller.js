var init = function(app) {
	require('../services/user_service')(app);	

	app.controller('LogoutPageController', function($scope, $http, $cookies, $location, UserService) {
		// Just logout and redirect
		UserService.logout();

		window.location = '#';
	});
};

if (module) {
	module.exports = init;
} else {
	init(app);
}
