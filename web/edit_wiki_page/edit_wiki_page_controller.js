var init = function(app) {
	require('../services/wiki_page_service')(app);

	app.controller('EditWikiPageController', function($scope, $cookies, $routeParams, $sce, WikiPageService) {
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
					$scope.title = "Weird!?";
					$scope.formErrors.push(error);
				}
				else if (results)
				{
					$scope.title = results.title;
					$scope.body = results.body;
					$scope.allowEdits = true;
				}				
				else
				{
					$scope.title = "Weird!?";
					$scope.body = $sce.trustAsHtml(markdown.toHTML("####A problem occured accessing the page.  You're probably not logged in."));
				}
			})
		}

		var editWikiPage = function() {
			WikiPageService.editWikiPage({
				title: $scope.routeTitle,
				body: $scope.body
			},
			function(error, results) {
				if (error) {
					console.log('Error:', error);
				}
				else
				{
					window.location = '/#/wiki/' + $scope.routeTitle;
				}
			})
		}

		$scope.getWikiPage = getWikiPage;
		$scope.editWikiPage = editWikiPage;

		$scope.title = "";
		$scope.body = "";
		$scope.formErrors = [];

		$scope.routeTitle = $routeParams.title;
		$scope.getWikiPage();
	});
}

if (module) {
	module.exports = init;
} else {
	init(app);
}