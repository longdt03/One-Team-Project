describe('MenuCtrl ', function() {
  beforeEach(module('ui.router'));
  beforeEach(module('firebase'));
  beforeEach(module('ionic'));
  beforeEach(module('one.services'));
  beforeEach(module('one.controllers.menu'));
  var $scope, $rootScope, $controllers,
      controller, rootScope;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();
        
    $controller('MenuCtrl', {
      '$scope': $scope
    });
  }));

  it('should have Device be chosen', function() {
    expect($rootScope.deviceName).toBeUndefined();
  });

  it('deviceName must be emty string', function() {
    $scope.logOut ();
    expect($scope.deviceName).toBe('');
  });

});