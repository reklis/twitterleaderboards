'use strict';

/**
 * @ngdoc service
 * @name LinkboardApp.leaderboard
 * @description
 * # leaderboard
 * Factory in the LinkboardApp.
 */
angular.module('LinkboardApp')
  .factory('leaderboard', function ($resource, apiroot) {
    return $resource('', {}, {
      user: {
        method: 'JSONP',
        url: apiroot + '/user?callback=JSON_CALLBACK'
      },
      results: {
        method: 'JSONP',
        url: apiroot + '/lb/:leaderboard_id/?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      remove: {
        method: 'JSONP',
        url: apiroot + '/lb/:leaderboard_id/remove?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      create: {
        method: 'JSONP',
        url: apiroot + '/lb/create?callback=JSON_CALLBACK',
        params: {
          name: '@name',
          topics: '@topics'
        }
      },
      restart: {
        method: 'JSONP',
        url: apiroot + '/restart/stream?callback=JSON_CALLBACK',
      }
    });
  });
