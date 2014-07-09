'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:PubCtrl
 * @description
 * # PubCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('PubCtrl', function ($scope, $routeParams, $location, $timeout, util, leaderboard) {

    $scope.loading = true;

    $scope.pubid = $routeParams.pubid;

    $scope.tabs = util.timewindows;
    $scope.prettyUrl = util.prettyUrl;

    leaderboard.pubresults(
      null,
      { id: $scope.pubid }
    ).$promise.then(
      function (lbdetails) {
        console.dir(lbdetails);

        $scope.lbdetails = lbdetails;

        $scope.activetab = 'lasthour';
        // $scope.updatePublishUrl($scope.lbdetails.lb.publish_key);

        $scope.loading = false;

        if (!lbdetails.rankings[util.timewindows[0].timewindow].length) {
          startAnimation();
        }
      },
      function (ex) {
        console.error(ex);
        $location.path('/');
      }
    );

    function startAnimation () {
      $scope.empty_animation_states = [
        '┏ (-_-) ┛',
        '┗ (-_-) ┓',
        '┗ (-_-) ┛',
        '┏ (-_-) ┓'
      ];

      $scope.empty_animation_state_i = -1;
      $scope.animation_speed = 500;

      nextAnimationFrame();
    }

    function nextAnimationFrame () {
      $scope.empty_animation_state_i++;

      $scope.empty_animation_state = $scope.empty_animation_states[
        $scope.empty_animation_state_i
          % $scope.empty_animation_states.length
      ];

      $timeout(nextAnimationFrame, $scope.animation_speed);
    }

  })
;
