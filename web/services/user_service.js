var init = function(app) {
	require('../services/session_service')(app)

	app.service('UserService', function($http, $cookies, SessionService) {
		var self = this;
		var user = null;

		var login = function(form, callback) {
			callback = callback ? callback : function() {};
			var request = $http({
				method: "POST",
				url: "/signin",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					email: form.email,
					password: form.password,
				}
			});

			request.success(function(results) {
				if (!results.error) {
					SessionService.createSession(form, callback)
				} else {
					callback(null, results);
				}
			});
		}

		var logout = function() {
			user = null;
			SessionService.logout();
		}

		var newUser = function(form, callback) {
			var request = $http({
				method: "POST",
				url: "/users",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					first: form.first,
					last: form.last,
					email: form.email,
					password: form.password,
					passwordConfirmation: form.passwordConfirmation
				}
			});

			request.success(function(results) {
				var createdUser = results;
				if (!results.error) {
/*
					SessionService.createSession({
						email: form.email,
						password: form.password
					}, function(error, results) {
						if (error) {
							console.error('Error while creating new user:', error);
							return;
						}
*/
						callback(null, createdUser);
//					})
				} else {
					callback(results.error, createdUser);
				}
			});
		}

		var getUnapprovedUsers = function(callback) {
			var request = $http({
				method: "GET",
				url: "/users/unapproved",
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				},
				data: {}
			});

			request.success(function(results) {
				console.log('results:', results);
				if (!results.error) {
					callback(null, results);
				} else {
					callback(results.error);
				}
			});
		}

		var approveUser = function(userId, callback) {
			var request = $http({
				method: "POST",
				url: "/users/" + userId + "/approve",
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				},
				data: {}
			});

			request.success(function(results) {
				console.log('results:', results);
				if (!results.error) {
					callback(null, results);
				} else {
					callback(results.error);
				}
			});
		}

		var getLoggedInUser = function(callback) {
			if (!$cookies.sessionHash) {
				callback({
					error: 'not logged in'
				});
				return;
			} else if (user) {
				return user;
			} else {
				SessionService.getSession({
					sessionHash: $cookies.sessionHash
				},
				function(error, results) {
					if (error) {
						callback(error);
						return;
					}
					user = results;

					callback(null, results);
				}
				);
			}
		};

		var isLoggedIn = function() {
			if ($cookies.sessionHash) {
				return true;
			}
			return false;
		}

		this.approveUser = approveUser;
		this.getUnapprovedUsers = getUnapprovedUsers;
		this.getLoggedInUser = getLoggedInUser;
		this.newUser = newUser;
		this.login = login;
		this.logout = logout;
		this.isLoggedIn = isLoggedIn;
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}
