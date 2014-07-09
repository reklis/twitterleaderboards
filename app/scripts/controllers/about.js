'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.contactInfo = {
      twitterhandle: 'sfusco'
    };

    $scope.steps = [
      { icon: 'user', text: 'Login with Twitter' },
      { icon: 'bookmark', text: 'Mark domains you want to watch' },
      { icon: 'dashboard', text: 'Links shared on twitter are detected, counted and ranked' },
      { icon: 'heart', text: 'Discover new stuff to love :)' }
    ];
  })
;
