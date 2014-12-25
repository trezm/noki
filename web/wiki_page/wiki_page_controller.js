var init = function(app) {
	require('../services/wiki_page_service')(app);

	app.controller('WikiPageController', function($scope, $cookies, $routeParams, $sce, WikiPageService) {
		var isLoggedIn = function() {
			return $cookies.sessionHash != undefined &&
				$cookies.sessionHash != null;
		}

		var getWikiPage = function() {
			WikiPageService.getWikiPage({
				title: $routeParams.title
			},
			function(error, results) {
				if (error) {
					$scope.errors = [error];
					$scope.title = "Weird!?";				
				}
				else if (results)
				{
					$scope.title = results.title;
					$scope.body = $sce.trustAsHtml(markdown.toHTML(results.body));
					$scope.allowEdits = true;
				}				
				else
				{
					$scope.title = "Weird!?";
					$scope.body = $sce.trustAsHtml(markdown.toHTML("####A problem occured accessing the page.  You're probably not logged in."));
				}
			})
		}

		$scope.errors = [];
		$scope.getWikiPage = getWikiPage;
		$scope.title = "";
		$scope.body = "";
		$scope.allowEdits = false;
		$scope.routeTitle = $routeParams.title;
		$scope.getWikiPage();
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}