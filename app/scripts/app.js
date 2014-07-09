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
      .when('/tweets/:encoded_url', {
        templateUrl: 'views/tweets.html',
        controller: 'TweetsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location) {
    $rootScope.timewindows = [
      { name: 'lasthour', timewindow: 3600000 },
      { name: 'lastday', timewindow: 86400000 }
    ];

    $rootScope.prettyUrl = function (u) {
      try {
        var parsed = purl(u);

        return parsed.attr('host')
          + ' '
          + parsed.attr('path')
            .replace(/\//g, ' ')
        ;
      } catch (ex) {
        return u.split('/')
          .filter(function (t) {
            return (t && (t.length > 1) && (t.length < 100));
          })
          .join(' ')
          .replace(/.*?:/, '')
          .replace(/%[\w\n]+/g, ' ')
          .replace(/[\?,=,_,~]/g, ' ')
          .replace(/.htm/, '')
        ;
      }
    };

    $rootScope.prettyTime = function (t) {
      return moment(t).fromNow();
    };

    $rootScope.showTw = function (lbitem) {
      var encoded_uri = encodeURIComponent(lbitem._id);
      $location.path('/tweets/' + encoded_uri);
    };
  })
;
