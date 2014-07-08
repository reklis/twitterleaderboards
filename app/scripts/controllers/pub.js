'use strict';

/**
 * @ngdoc function
 * @name LinkboardApp.controller:PubCtrl
 * @description
 * # PubCtrl
 * Controller of the LinkboardApp
 */
angular.module('LinkboardApp')
  .controller('PubCtrl', function ($scope, $routeParams, $location, util, leaderboard) {

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
      },
      function (ex) {
        console.error(ex);
        $location.path('/');
      }
    );

  })
;
