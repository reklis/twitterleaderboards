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
      pubresults: {
        method: 'JSONP',
        url: apiroot + '/pub/:pub_id/?callback=JSON_CALLBACK',
        params: {
          pub_id: '@id'
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
      publish: {
        method: 'JSONP',
        url: apiroot + '/lb/:leaderboard_id/publish?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      unpublish: {
        method: 'JSONP',
        url: apiroot + '/lb/:leaderboard_id/unpublish?callback=JSON_CALLBACK',
        params: {
          leaderboard_id: '@id'
        }
      },
      tweets: {
        method: 'JSONP',
        url: apiroot + '/tweets/:encoded_url?callback=JSON_CALLBACK',
        params: {
          encoded_url: '@encoded_url'
        }
      }
    });
  })
;
