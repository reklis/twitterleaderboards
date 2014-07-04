'use strict';

describe('Controller: LeaderboarddetailCtrl', function () {

  // load the controller's module
  beforeEach(module('LinkboardApp'));

  var LeaderboarddetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeaderboarddetailCtrl = $controller('LeaderboarddetailCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
