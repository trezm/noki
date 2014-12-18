var init = function(app) {
	app.service('SessionService', function($http, $cookies) {
		var self = this;
		var createSession = function(form, callback) {
			callback = callback ? callback : function() {};
			var requestData = {
				email: form.email,
				password: form.password
			};

			var request = $http({
				method: "POST",
				url: "/session",
				headers: {
					'Content-Type': 'application/json'
				},
				data: requestData
			});

			request.success(function(results) {
				if (!results.error) {
					$cookies.sessionHash = results.sessionHash;

					callback(null, results);
					return;
				}
				callback(results);
			});
		}

		var getSession = function(form, callback) {
			callback = callback ? callback : function() {};
			var request = $http({
				method: "GET",
				url: "/session?sessionHash=" + form.sessionHash,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			request.success(function(results) {
				if (!results.error) {
					callback(null, results);
					return;
				}
				callback(null);
			});
		}

		var tryLogin = function(callback) {
			if ($cookies.sessionHash) {
				this.getSession({
						sessionHash: $cookies.sessionHash
					},
					callback
				);
			} else {
				callback();
			}
		}

		var logout = function() {
			delete $cookies.sessionHash;
		}

		this.createSession = createSession;
		this.getSession = getSession;
		this.tryLogin = tryLogin;
		this.logout = logout;
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}
