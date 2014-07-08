'use strict';

describe('Controller: PubCtrl', function () {

  // load the controller's module
  beforeEach(module('LinkboardApp'));

  var PubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PubCtrl = $controller('PubCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
