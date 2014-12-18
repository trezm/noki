var init = function(app) {
	require('../services/user_service')(app);	

	app.controller('LoginPageController', function($scope, $http, $cookies, $location, UserService) {
		var login = function() {
			UserService.login({
					email: $scope.email,
					password: $scope.password
				},
				function(error, results) {
					if (error || results.error) {
						alert('Incorrect email or password');
						console.log('error logging in:', error || results.error);
						return;
					}

					var query = $location.search();
					if (query.redirect_to) {
						window.location = '/#/' + query.redirect_to;
					} else {
						window.location = '/#/';
					}
				}
			);
		}

		$scope.login = login;
	});
};

if (module) {
	module.exports = init;
} else {
	init(app);
}