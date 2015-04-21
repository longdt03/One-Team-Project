describe('MenuCtrl ', function() {

  var $rootScope, $controllers,
      controller, rootScope;

  beforeEach(function() {
    module('ui.router');
    module('ui.router');
    module('ionic');
    module('one.services');
    module('one.controllers.menu');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $scope = {};
          
      $controller('MenuCtrl', {
        '$scope': $scope
      });
    });
  });

  //here we're going to make sure the $scope variable 
  //exists evaluated.
  it("should have a $scope variable", function() {
      expect($scope).toBeDefined();
  });

  describe ('Camera ', function(){

    it('should have device be chosen ($scope)', function() {
      $scope.camera ();
      expect($scope.data.selectedDevice.name).toBeUndefined();
    });

    it('should have device be chosen ($rootScope)', function() {
      $scope.camera ();
      expect($rootScope.deviceName).toBeUndefined();
    });
  });

});