describe('CameraCtrl:', function () {
  beforeEach(function() {
    module('ionic');
    module('one.services');
    module('one.controllers.camera');
    module('firebase');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $scope = $rootScope.$new (); 

          
      controller = $controller('CameraCtrl', {
        '$scope': $scope,
      });
    }); 
  })

  describe('submit button: ', function() {
    var ref = new Firebase ('https://one-app.firebaseio.com/3/SpeedForce');
    var service;
    beforeEach(inject(function(Popup) {
      service = Popup;
    }))

    // test for showLoading function 
    it ('should run showLoading function first!', function() {
      spyOn($scope, 'showLoading');
      $scope.submit();
      expect($scope.showLoading).toHaveBeenCalled();
    })


    // it ('should recieve a image from database', function() {

    // })


  })

  describe('IonicLoading: ', function(){
    var ionicLoading;
    beforeEach(inject(function($ionicLoading) {
      ionicLoading = $ionicLoading;
    }))

    it('should be shown an message!', function() {
      spyOn(ionicLoading, 'show');
      $scope.showLoading();
      expect(ionicLoading.show).toHaveBeenCalledWith
        ({templateUrl: 'templates/loading-template.html'});
    })

    it('should be closed after all!', function() {
      spyOn(ionicLoading, 'hide');
      $scope.hideLoading();
      expect(ionicLoading.hide).toHaveBeenCalled();
    })
  })
})