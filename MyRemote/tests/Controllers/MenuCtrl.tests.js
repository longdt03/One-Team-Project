describe('MenuCtrl ', function() {

  var $rootScope, $controllers,
      controller, rootScope;

  //create a fake service
  var $ionicSideMenuDelegate = {
    toggleLeft: function () {}
  };

  beforeEach(function() {
    module('ionic');
    module('one.services');
    module('one.controllers.menu');
    module('firebase');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      state = $injector.get('$state');
      $scope = $rootScope.$new (); 

          
      controller = $controller('MenuCtrl', {
        '$scope': $scope,
        '$ionicSideMenuDelegate': $ionicSideMenuDelegate,
        '$state': state
      });
    });
  });

  //here we're going to make sure the $scope variable 
  //exists evaluated.
  it('should have a $scope variable', function() {
      expect($scope).toBeDefined();
  });

  // test chose device function
  it(' devices should be got!', function(){
    var device = {name: 'HIEN'};
    $scope.choseDevice (device);
    expect($scope.data.selectedDevice.name).toEqual(device.name);
  });

  // test toggleLeft
  describe ('toggleLeft function', function() {
    it('should be call!', function() {
      // create spy
      spyOn($ionicSideMenuDelegate, 'toggleLeft');
      $scope.toggleLeft ();
      expect($ionicSideMenuDelegate.toggleLeft).toHaveBeenCalled();
    })
  });

  // test funtions when press Camera button
  describe ('Camera ', function(){
    it ('should handle with handleData function', function() {
      spyOn($scope, 'handleData');
      $scope.camera();
      expect($scope.handleData).toHaveBeenCalledWith('camera');
    });
    
  });


  // test funtions when press Shutdown button
  describe ('Shutdown ', function(){
    it ('should handle with handleData function', function() {
      spyOn($scope, 'handleData');
      $scope.shutdown();
      expect($scope.handleData).toHaveBeenCalledWith('shut-down');
    });
    
  });

  // test funtions when press Present button
  describe ('Present ', function(){
    it ('should handle with handleData function', function() {
      spyOn($scope, 'handleData');
      $scope.present();
      expect($scope.handleData).toHaveBeenCalledWith('presentation');
    });
    
  });

});