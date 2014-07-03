'use strict';

/**
 * @ngdoc function
 * @name twitterleaderboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitterleaderboardApp
 */
angular.module('twitterleaderboardApp')
.controller('MainCtrl', function ($scope, apiconfig, leaderboard) {
    $scope.maxlbs = 4;
    $scope.loading = true;
    $scope.twitterLoginUrl = apiconfig.rooturl + apiconfig.twitterlogin;

    $scope.fetchUser = function () {
      $scope.auth = leaderboard.user(function () {
        if ($scope.auth && $scope.auth.user) {
          $scope.user = $scope.auth.user;
          console.log($scope.user);
        } else {
          $scope.notloggedin = true;
        }

        $scope.loading = false;
      });
    };

    $scope.showCreateLbForm = function () {
      $scope.newlb = {};
      $('#create-lb-modal').modal('show');
      $('#input-lbname').focus();
    };

    $scope.parseRawName = function () {
      $scope.newlb.name = $scope.newlb.rawname;
    };

    $scope.parseRawKeywords = function () {
      $scope.newlb.topics = $scope.newlb.rawkeywords.split(/\s*,\s*/);
    };

    $scope.formValid = function () {
      var lb = $scope.newlb, v;

      v = !!(
        lb
        &&
        lb.rawname
        &&
        lb.rawname.length
        &&
        lb.name
        &&
        (lb.name.length > 5)
        &&
        (lb.name.length < 24)
        &&
        lb.rawkeywords
        &&
        lb.rawkeywords.length
        &&
        lb.topics
        &&
        lb.topics.length
        &&
        (lb.topics.length < 12)
      );

      return v;
    };

    $scope.createLb = function () {
      if (!$scope.formValid()) {
        return;
      }

      $scope.creatingLb = true;

      leaderboard.create($scope.newlb, function () {
        $scope.creatingLb = false;

        $scope.fetchUser();
        $('#create-lb-modal').modal('hide');
      });
    };

    $scope.restartStream = function () {
      leaderboard.restart(function () {
        $scope.fetchUser();
      });
    };

    $scope.fetchUser();

  });
