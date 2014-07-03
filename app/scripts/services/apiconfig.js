'use strict';

/**
 * @ngdoc service
 * @name twitterleaderboardApp.apiconfig
 * @description
 * # apiconfig
 * Constant in the twitterleaderboardApp.
 */
angular.module('twitterleaderboardApp')
  .constant('apiconfig', {
    // rooturl: 'http://polar-eyrie-5877.herokuapp.com',
    rooturl: 'http://localhost:5000',
    twitterlogin: '/auth/twitter'
  });
