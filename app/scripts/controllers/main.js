/*global purl */

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

    $scope.fetchUser = function () {
      leaderboard.user().$promise.then(function (auth) {
        $scope.auth = auth;

        if ($scope.auth && $scope.auth.user) {
          $scope.user = $scope.auth.user;
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

    $scope.showCreateLbForm = function () {
      $scope.newlb = {};
      $('#create-lb-modal').modal('show');
      $('#input-lbname').focus();
    };

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
          .filter(function (t) {
            return t.length;
          })
          .map(function (t) {
            return purl(t).attr('host');
          })
          .filter(function (h) {
            return (h && h.length && (h.length < 128));
          })
          .map(function (h) {
            if (-1 !== h.indexOf('.')) {
              var parts = h.split('.');
              return (parts && parts.length)
                ? parts.reduce(function (a, b) {
                  return (a.length > b.length)
                    ? a
                    : b
                  ;
                })
                : null
              ;
            } else {
              return h;
            }
          })
          .compact()
          .uniq()
          .value()
        ;
      } catch (ex) {
        $scope.newlb.topics = [];
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

    $scope.formValid = function () {
      return ($scope.validName() && $scope.validKeywords());
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
