var $ = require('jquery/dist/jquery.min.js');
window.jQuery = $;
window.$ = $;

require('bootstrap/dist/js/bootstrap.min.js');
require('angular/angular.min.js');
require('angular-route/angular-route.min.js');
require('angular-cookies/angular-cookies.min.js');
window.markdown = require('markdown/lib/markdown.js');

var app = angular
	.module('BootsolesApp', [
		'ngRoute',
		'ngCookies'
	])
	.config(
		[
			'$routeProvider',
			function($routeProvider) {
				// Specify routes to load our partials upon the given URLs
				$routeProvider.when('/', {
					templateUrl: 'landing_page/landing_page.html'
				});
				$routeProvider.when('/login', {
					templateUrl: 'login_page/login_page_view.html',
					controller: 'LoginPageController'
				});
				$routeProvider.when('/logout', {
					templateUrl: 'logout_page/logout_page_view.html',
					controller: 'LogoutPageController'
				});
				$routeProvider.when('/signup', {
					controller: 'SignupPageController',
					templateUrl: 'signup_page/signup_page_view.html'
				});
				$routeProvider.when('/admin', {
					controller: 'AdminPageController',
					templateUrl: 'admin_page/admin_page_view.html'
				});
				$routeProvider.when('/wiki/new', {
					controller: 'NewWikiPageController',
					templateUrl: 'new_wiki_page/new_wiki_page_view.html'
				});
				$routeProvider.when('/wiki/search', {
					controller: 'SearchWikiPageController',
					templateUrl: 'search_wiki_page/search_wiki_page_view.html'
				});
				$routeProvider.when('/wiki/:title', {
					controller: 'WikiPageController',
					templateUrl: 'wiki_page/wiki_page_view.html'
				});
				$routeProvider.when('/wiki/:title/edit', {
					controller: 'EditWikiPageController',
					templateUrl: 'edit_wiki_page/edit_wiki_page_view.html'
				});
				$routeProvider.when('/confirm', {
					templateUrl: 'confirmation_page/confirmation_page_view.html'
				});
				$routeProvider.otherwise({
					redirectTo: '/'
				});
			}
		]
	);

require('./signup_page/signup_page_controller')(app);
require('./login_page/login_page_controller')(app);
require('./logout_page/logout_page_controller')(app);
require('./admin_page/admin_page_controller')(app);

require('./search_wiki_page/search_wiki_page_controller')(app);
require('./new_wiki_page/new_wiki_page_controller')(app);
require('./wiki_page/wiki_page_controller')(app);
require('./edit_wiki_page/edit_wiki_page_controller')(app);

require('./menu_bar/menu_bar_controller')(app);
require('./footer/footer_controller')(app);