'use strict';

/**
 * @ngdoc function
 * @name twitterleaderboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the twitterleaderboardApp
 */
angular.module('twitterleaderboardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.contactInfo = {
      twitterhandle: 'sfusco'
    };
  });
