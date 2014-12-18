var init = function(app) {
	require('../services/user_service')(app);
	var validator = require('./signup_page_validations')(app);

	app.controller('SignupPageController', function($scope, $http, $cookies, UserService) {
		var newUser = function() {
			if (validateFields()) {
				createNewUser();
			} else {
				$('body').animate({
					scrollTop: 0
				});
			}
		}

		var validateField = function(event) {
			var field = event.target;
			validator.validateField(field);
		}

		var validateFields = function() {
			var errors = validator.validateForm(signupForm);

			$scope.formErrors = errors;
			return errors.length == 0;
		}

		var createNewUser = function() {
			UserService.newUser({
					first: $scope.first,
					last: $scope.last,
					email: $scope.email,
					password: $scope.password,
					passwordConfirmation: $scope.passwordConfirmation
				},
				function(error, results) {
					if (error) {
						console.log('Error:', error);
						return;
					}
					window.location = '/';
				}
			);
		}

		$scope.formErrors = [];
		$scope.newUser = newUser;
		$scope.validateField = validateField;
	});
};

if (module) {
	module.exports = init;
} else {
	init(app);
}