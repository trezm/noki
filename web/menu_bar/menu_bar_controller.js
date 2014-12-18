var init = function(app) {
	// Require the directive
	require('./menu_bar_directive')(app);

	app.controller('MenuBarController', function($scope, $cookies, UserService) {
		var isLoggedIn = function() {
			return $cookies.sessionHash != undefined &&
				$cookies.sessionHash != null;
		}

		$scope.isLoggedIn = isLoggedIn;
		$scope.first = '';
		$scope.last = '';

		$scope.$watch(function() {
				return $cookies.sessionHash;
			},
			function(newValue) {
				if (newValue != undefined &&
					newValue != null) {
					UserService.getLoggedInUser(function(error, results) {
						if (results && results.user) {
							$scope.first = results.user.first;
							$scope.last = results.user.last;
						}
					})
				}
			})
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}