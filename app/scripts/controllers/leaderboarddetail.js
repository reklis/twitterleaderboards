/*global console, window */

'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:LeaderboardDetailCtrl
 * @description
 * # LeaderboardDetailCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('LeaderboardDetailCtrl', function ($scope, $rootScope, $routeParams, $location, $timeout, leaderboard) {

    $scope.loading = true;
    $scope.sharingLb = false;
    $scope.unsharingLb = false;
    $scope.deletingLb = false;

    $scope.lbid = $routeParams.lbid;

    leaderboard.results({ id: $scope.lbid })
      .$promise.then(function (lbdetails) {
        var maintw = $rootScope.timewindows[0];

        $scope.lbdetails = lbdetails;

        $scope.loading = false;

        $scope.activetab = maintw.name;
        $scope.updatePublishUrl($scope.lbdetails.lb.publish_key);

      }, function (ex) {
        $scope.loading = false;

        console.error(ex);
        $location.path('/');
      }
    );

    $scope.updatePublishUrl = function (publish_key) {
      var u = window.location;

      $scope.publish_url = (publish_key)
        ? u.protocol + '//' + u.host + '/#/pub/' + publish_key
        : null
      ;
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
          }, 1e3);
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
          $('#confirm-share-modal').modal('hide');
        }
      );
    };

    $scope.confirmUnShareLb = function () {
      $('#confirm-unshare-modal').modal('show');
    };

    $scope.unshareLb = function () {
      $scope.unsharingLb = true;

      leaderboard.unpublish(
        null,
        { id: $scope.lbid },
        function () {
          // console.log(publish_result);
          $scope.updatePublishUrl();
          $scope.unsharingLb = false;
          $('#confirm-unshare-modal').modal('hide');
        }
      );
    };

  })
;
