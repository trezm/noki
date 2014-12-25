var init = function(app) {
	require('../services/user_service')(app);

	app.controller('AdminPageController', function($scope, $cookies, $routeParams, UserService) {
		var isLoggedIn = function() {
			return $cookies.sessionHash != undefined &&
				$cookies.sessionHash != null;
		}

		var getUnapprovedUsers = function() {
			UserService.getUnapprovedUsers(
			function(error, results) {
				if (error) {
					$scope.errors = [error];
					$scope.title = "Weird!?";				
				}
				else if (results)
				{
					$scope.unapprovedUsers = results;
				}				
				else
				{
				}
			})
		}

		var approveUser = function(user) {
			UserService.approveUser(user._id, function(error, results) {
				if (error) {
					$scope.errors = [error];
					$scope.title = "Weird!?";				
				}
				else if (results)
				{
					$scope.getUnapprovedUsers();
				}				
				else
				{
				}
			})
		}

		$scope.getUnapprovedUsers = getUnapprovedUsers;
		$scope.approveUser = approveUser;
		$scope.errors = [];
		$scope.unapprovedUsers = [];
		$scope.getUnapprovedUsers();
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}