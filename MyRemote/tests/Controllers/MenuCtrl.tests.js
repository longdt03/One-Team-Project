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
    $scope.chooseDevice (device);
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

  // test funtions when press camera button
  describe ('Camera ', function(){
    var service;
    beforeEach(inject(function(Popup) {
      service = Popup;
    }));
  

    it ('should be change state after that', function(){
      spyOn (state,'go');
      $scope.data.selectedDevice.name = "HIEN";   
      state.current.name = 'main-menu';   
      $scope.camera();
      expect(state.go).toHaveBeenCalledWith ('camera');
    });

    it(' showAlert should be called if deviceName has not choosen', function() {
      spyOn(service, 'showAlert');
      state.current.name = 'main-menu';
      $scope.camera();
      expect(service.showAlert).toHaveBeenCalledWith
          ('No Device!', 'Please choose your device in sidemenu.');

    });



  });

  // test funtions when press shutdown button
  describe ('Shutdown ', function(){
    
    it ('should be change state after that', function(){
      spyOn (state,'go');
      $scope.data.selectedDevice.name = "HIEN";
      state.current.name = 'main-menu';
      $scope.shutdown();
      expect(state.go).toHaveBeenCalledWith ('shut-down');
    });

    it(' showAlert should be called if deviceName has not choosen', function() {
      spyOn(service, 'showAlert');
      state.current.name = 'main-menu';
      $scope.shutdown();
      expect(service.showAlert).toHaveBeenCalledWith
          ('No Device!', 'Please choose your device in sidemenu.');

    });

    
  });

});