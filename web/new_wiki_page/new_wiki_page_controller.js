var init = function(app) {
	require('../services/wiki_page_service')(app);

	app.controller('NewWikiPageController', function($scope, $cookies, WikiPageService) {
		var isLoggedIn = function() {
			return $cookies.sessionHash != undefined &&
				$cookies.sessionHash != null;
		}

		var newWikiPage = function() {
			WikiPageService.createWikiPage({
				title: $scope.title,
				body: $scope.body
			},
			function(error, results) {
				if (error) {
					console.log('Error:', error);
				}
				else
				{
					window.location = '/#/wiki/' + results.underscoredTitle;
				}
			})
		}

		$scope.newWikiPage = newWikiPage;
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}