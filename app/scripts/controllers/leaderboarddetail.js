'use strict';

/**
 * @ngdoc function
 * @name twitterleaderboardApp.controller:LeaderboarddetailCtrl
 * @description
 * # LeaderboarddetailCtrl
 * Controller of the twitterleaderboardApp
 */
angular.module('twitterleaderboardApp')
  .controller('LeaderboardDetailCtrl', function ($scope, $routeParams, $location, leaderboard) {

    $scope.loading = true;
    $scope.lbid = $routeParams.lbid;

    $scope.lbdetails = leaderboard.results(
      null,
      { id: $scope.lbid },
      function () {
        $scope.loading = false;

        $scope.activetab = 'lasthour';
      }
    );

    $scope.lbdetails.$promise.catch(function () {
      $location.path('/');
    });

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

  });
