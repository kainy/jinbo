'use strict';

angular.module('JinboApp', ['ngCookies', 'ngResource', 'ngRoute', 'infinite-scroll', 'chieffancypants.loadingBar', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');
			$routeProvider
			.when('/', {
				templateUrl : 'views/main.html',
				controller : 'MainCtrl'
			})
			.when('/weibo', {
				templateUrl : 'views/weibo-list.html',
				controller : 'WeiboListCtrl'
			})
			.otherwise({
				redirectTo : '/weibo'
			});
		}
	])
$('#loading').hide();