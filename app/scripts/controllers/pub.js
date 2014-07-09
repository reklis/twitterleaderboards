'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:PubCtrl
 * @description
 * # PubCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('PubCtrl', function ($rootScope, $scope, $routeParams, $location, $timeout, leaderboard) {

    $scope.loading = true;
    $scope.pubid = $routeParams.pubid;

    leaderboard.pubresults(
      null,
      { id: $scope.pubid }
    ).$promise.then(
      function (lbdetails) {
        var maintw = $rootScope.timewindows[0];
        // console.dir(lbdetails);

        $scope.lbdetails = lbdetails;

        $scope.activetab = maintw.name;
        // $scope.updatePublishUrl($scope.lbdetails.lb.publish_key);

        $scope.loading = false;

        if (!lbdetails.rankings[maintw.timewindow].length) {
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
