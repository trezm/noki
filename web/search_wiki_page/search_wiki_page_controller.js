var init = function(app) {
	require('../services/wiki_page_service')(app);

	app.controller('SearchWikiPageController', function($scope, $cookies, $location, $sce, WikiPageService) {
		var isLoggedIn = function() {
			return $cookies.sessionHash != undefined &&
				$cookies.sessionHash != null;
		}

		var getWikiPages = function() {
			WikiPageService.getWikiPages({
				title: $location.search().query
			},
			function(error, results) {
				if (error) {
					console.error(error.error);
				}
				else if (results)
				{
					$scope.pages = results;
				}				
				else
				{

				}
			})
		}

		$scope.getWikiPages = getWikiPages;
		$scope.pages = [];
		$scope.getWikiPages();
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}
