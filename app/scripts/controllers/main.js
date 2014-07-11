'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
.controller('MainCtrl', function ($scope, apiroot, leaderboard) {
    $scope.maxlbs = 4;
    $scope.loading = true;

    $scope.twitterLoginUrl = apiroot + '/auth/twitter';
    $scope.twitterLogoutUrl = apiroot + '/logout';

    $scope.mostrecent = [];

    $scope.fetchUser = function () {
      leaderboard.user().$promise.then(function (auth) {
        $scope.auth = auth;

        if ($scope.auth && $scope.auth.user) {
          $scope.user = $scope.auth.user;

          if (!$scope.user.leaderboards) {
            $scope.user.leaderboards = [];
          }

          // console.log($scope.user);
        } else {
          $scope.notloggedin = true;
        }
        $scope.loading = false;
      }, function (login_error) {
        console.error(login_error);
        $scope.login_error = 'Login failed';
        $scope.loading = false;
      });
    };

    $scope.fetchRecent = function () {
      leaderboard.recent().$promise.then(
        function (result) {
          $scope.mostrecent = result.recent;
          console.dir(result);
        },
        function (error) {
          console.error(error);
        }
      );
    };

    $scope.showCreateLbForm = function () {
      $scope.newlb = {};
      $('#create-lb-modal').modal('show');
    };

    $('#create-lb-modal').on('shown.bs.modal', function () {
      $('#input-lbname').focus();
    });

    $scope.parseRawName = function () {
      var
        raw = $scope.newlb.rawname,
        matches = raw.match(/[\w,\-, \n]+/),
        name
      ;

      name = (matches && matches.length)
        ? matches[0]
        : null
      ;

      if (name && name.length) {
        name = name.substring(0,25);
      }

      $scope.newlb.name = name;
    };

    $scope.parseRawKeywords = function () {
      try {
        $scope.newlb.topics = _.chain($scope.newlb.rawkeywords.split(/[\s,\,]/))
          .compact()
          .uniq()
          .value()
        ;
      } catch (ex) {
        $scope.newlb.topics = [];
      }
    };

    $scope.parseRawDomains = function () {
      try {
        $scope.newlb.domains = _.chain($scope.newlb.rawdomains.split(/[\s,\,]/))
          .compact()
          .uniq()
          .value()
        ;
      } catch (ex) {
        $scope.newlb.domains = [];
      }
    };


    $scope.validName = function () {
      var n = ($scope.newlb) ? $scope.newlb.name : null;
      return (n && n.length);
    };

    $scope.validKeywords = function () {
      var t = ($scope.newlb) ? $scope.newlb.topics : null;
      return (t && t.length && (t.length < 9));
    };

    $scope.validDomains = function () {
      var d = ($scope.newlb) ? $scope.newlb.domains : null;
      return (d && d.length && (d.length < 9));
    };

    $scope.formValid = function () {
      return ($scope.validName() && $scope.validKeywords() && $scope.validDomains());
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
    $scope.fetchRecent();

  })
;
