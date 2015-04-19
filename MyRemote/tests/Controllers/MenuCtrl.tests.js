//test/Controllers/MenuCtrl.tests.js

 
describe('MenuCtrl: ', function(){
  var scope;//we'll use this scope in our tests

  beforeEach(module('one.controllers.menu'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('MenuCtrl', {$scope: scope});
  }));

  // tests start here
  describe('Camera: ',function(MenuCtrl){
    it('must chose a device!', function(){
      expect(scope.deviceName).toBeUndefined();
    });
  });
});