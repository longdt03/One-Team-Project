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

          
      $controller('CameraCtrl', {
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

    it('should announce when there is no data to recieve', function() {
      spyOn(service,'showAlert');
      $scope.submit();
      expect(service.showAlert).not.toHaveBeenCalledWith
        ('Network error!', 'Cannot get image.');
    })

    it('hideLoading just run after a long time waiting!', function() {
      spyOn($scope, 'hideLoading');
      $scope.data = '';
      $scope.submit();
      expect($scope.hideLoading).not.toHaveBeenCalled();
    })

    //test update data to firebase
    it('should not have request update on firebase!', function() {
      
      var time = new Date();
    
      ref.child('request').on('value', function(snapshot) {
          $scope.request = snapshot.val();
      })
      var request = 'capture|' + time.getTime().toString();
  
      expect($scope.request).not.toEqual(request);
    })

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