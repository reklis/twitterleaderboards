/*global URI, console, window */

'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:LeaderboardDetailCtrl
 * @description
 * # LeaderboardDetailCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('LeaderboardDetailCtrl', function ($scope, $routeParams, $location, $timeout, leaderboard) {

    $scope.loading = true;
    $scope.sharingLb = false;
    $scope.deletingLb = false;

    $scope.lbid = $routeParams.lbid;

    $scope.lbdetails = leaderboard.results(
      null,
      { id: $scope.lbid },
      function () {
        $scope.loading = false;

        $scope.activetab = 'lasthour';

        if ($scope.lbdetails.lb
          && $scope.lbdetails.lb.publish_key
        ) {
          $scope.updatePublishUrl($scope.lbdetails.lb.publish_key);
        }
      }
    );

    $scope.lbdetails.$promise.catch(function (ex) {
      console.error(ex);
      $location.path('/');
    });

    $scope.updatePublishUrl = function (publish_key) {
      var s, u = window.location;

      if (publish_key) {
        s = u.protocol + '//' + u.host + '/#/pub/' + publish_key;
      } else if ($scope.sharingLb) {
        s ='publishing...';
      } else {
        s = 'unpublished';
      }

      $scope.publish_url = s;
    };

    $scope.confirmDeleteLb = function () {
      $('#confirm-delete-modal').modal('show');
    };

    $scope.deleteLb = function () {
      $scope.deletingLb = true;

      leaderboard.remove(
        null,
        { id: $scope.lbid },
        function () {
          $scope.deletingLb = false;
          $('#confirm-delete-modal').modal('hide');

          $timeout(function () {
            $location.path('/');
          }, 250);
        }
      );
    };

    $scope.confirmShareLb = function () {
      $('#confirm-share-modal').modal('show');
    };

    $scope.shareLb = function () {
      var publish_result;

      $scope.sharingLb = true;

      publish_result = leaderboard.publish(
        null,
        { id: $scope.lbid },
        function () {
          // console.log(publish_result);
          $scope.updatePublishUrl(publish_result.publish_key);
          $scope.sharingLb = false;
        }
      );
    };
  });
