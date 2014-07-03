'use strict';

/**
 * @ngdoc service
 * @name twitterleaderboardApp.leaderboard
 * @description
 * # leaderboard
 * Factory in the twitterleaderboardApp.
 */
angular.module('twitterleaderboardApp')
  .factory('leaderboard', function ($resource, apiconfig) {
    return $resource('', {}, {
      user: {
        method: 'JSONP',
        url: apiconfig.rooturl + '/user?callback=JSON_CALLBACK'
      },
      results: {
        method: 'JSONP',
        url: apiconfig.rooturl + '/lb/:leaderboard_id/?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      remove: {
        method: 'JSONP',
        url: apiconfig.rooturl + '/lb/:leaderboard_id/remove?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      create: {
        method: 'JSONP',
        url: apiconfig.rooturl + '/lb/create?callback=JSON_CALLBACK',
        params: {
          name: '@name',
          topics: '@topics'
        }
      },
      restart: {
        method: 'JSONP',
        url: apiconfig.rooturl + '/restart/stream?callback=JSON_CALLBACK',
      }
    });
  });
