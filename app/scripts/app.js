'use strict';

/**
 * @ngdoc overview
 * @name twitterleaderboardApp
 * @description
 * # twitterleaderboardApp
 *
 * Main module of the application.
 */
angular
  .module('twitterleaderboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/linkboard/:lbid', {
        templateUrl: 'views/leaderboarddetail.html',
        controller: 'LeaderboardDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
