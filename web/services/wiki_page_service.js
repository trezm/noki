var init = function(app) {
	app.service('WikiPageService', function($http, $cookies) {
		var self = this;
		var createWikiPage = function(form, callback) {
			callback = callback ? callback : function() {};
			var requestData = {
				page: {
					title: form.title,
					body: form.body
				}
			};

			var request = $http({
				method: "POST",
				url: "/page",
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				},
				data: requestData
			});

			request.success(function(results) {
				if (results.error) {
					callback(results);
				} else {
					callback(null, results);
				}
			});

			request.error(function(error) {
				callback(error);
			})
		}

		var getWikiPage = function(form, callback) {
			callback = callback ? callback : function() {};
			var request = $http({
				method: "GET",
				url: "/pages/" + form.title,
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				}
			});

			request.success(function(results, status, headers, config) {
				if (!results.error) {
					callback(null, results);
					return;
				}
				callback(null);
			});

			request.error(function(error) {
				callback(error);
			})
		}

		var getWikiPages = function(form, callback) {
			callback = callback ? callback : function() {};
			var request = $http({
				method: "GET",
				url: "/pages?title=" + form.title,
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				}
			});

			request.success(function(results, status, headers, config) {
				if (!results.error) {
					callback(null, results);
					return;
				}
				callback(null);
			});

			request.error(function(error) {
				callback(error);
			})
		}

		var editWikiPage = function(form, callback) {
			callback = callback ? callback : function() {};
			var requestData = {
				page: {
					body: form.body
				}
			};

			var request = $http({
				method: "PUT",
				url: "/pages/" + form.title,
				headers: {
					'Content-Type': 'application/json',
					'sessionhash': $cookies.sessionHash
				},
				data: requestData
			});

			request.success(function(results) {
				if (results.error) {
					callback(results);
				} else {
					callback(null, results);
				}
			});

			request.error(function(error) {
				callback(error);
			})
		}

		this.createWikiPage = createWikiPage;
		this.getWikiPage = getWikiPage;
		this.getWikiPages = getWikiPages;		
		this.editWikiPage = editWikiPage;
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}