'use strict';

/**
 * @ngdoc overview
 * @name LinkboardApp
 * @description
 * # LinkboardApp
 *
 * Main module of the application.
 */
angular
  .module('LinkboardApp', [
    'LinkboardApp.config',
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
      .when('/pub/:pubid', {
        templateUrl: 'views/pub.html',
        controller: 'PubCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
