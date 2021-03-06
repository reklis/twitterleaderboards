'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:TweetsCtrl
 * @description
 * # TweetsCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('TweetsCtrl', function ($scope, $routeParams, $location, leaderboard) {

    $scope.loading = true;
    $scope.encoded_url = $routeParams.encoded_url;
    $scope.decoded_url = decodeURIComponent($routeParams.encoded_url);

    leaderboard.tweets(
      null,
      {
        user_id: $routeParams.user_id,
        leaderboard_id: $routeParams.leaderboard_id,
        encoded_url: $scope.encoded_url
      }
    ).$promise.then(function (result) {

      $scope.tweets = result.tweets.sort(function (a, b) {
        var
          d1 = +moment(a.src.created_at),
          d2 = +moment(b.src.created_at)
        ;

        return d1 - d2;
      });

      $scope.loading = false;

    }, function (fetch_error) {

      $scope.fetch_error = fetch_error;
      $scope.loading = false;

    });


  })
;
