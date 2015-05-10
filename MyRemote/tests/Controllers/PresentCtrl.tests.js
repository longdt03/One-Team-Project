describe('PresentCtrl:', function () {
  beforeEach(function() {
    module('ionic');
    module('one.services');
    module('one.controllers.presentation');
    module('firebase');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $scope = $rootScope.$new (); 

          
      $controller('PresentCtrl', {
        '$scope': $scope,
      })
    })
  })

  describe('submit', function() {
    var popup;
    beforeEach(inject(function(Popup) {
      popup = Popup;
    }))

    //test request
    it(' should make a request first!', function() {
      var time = new Date ();
      var ref = new Firebase ('https://one-app.firebaseio.com/3/SpeedForce');
      $scope.submit('first_slide');
      var request = 'first_slide|' + time.getTime().toString();
      expect($scope.request).toEqual(request);
    })

    //test Popup 
    it(' should annouce when updae failed!', function() {

      var ref = new Firebase ('https://one-app.firebaseio.com/3/SpeedForce');
      var request;
      spyOn(popup, 'showAlert');
      $scope.submit('first_slide');
      
      expect(popup.showAlert).not.toHaveBeenCalledWith('Failed!', 'Cannot send request.');
    })
  })

})