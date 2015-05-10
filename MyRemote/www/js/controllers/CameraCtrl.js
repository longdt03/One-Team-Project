angular
  .module('one.controllers.camera', [])
  .controller('CameraCtrl', [
    '$scope', 
    '$firebase', 
    '$rootScope',  
    '$ionicLoading', 
    '$timeout',
    'Popup',
    cameraCtrl
  ]);

function cameraCtrl(
  $scope, 
  $firebase, 
  $rootScope, 
  $ionicLoading, 
  $timeout, 
  Popup
  ) {
  var refChild = new Firebase (firebaseUrl + '/' + $rootScope.id 
                          + '/' + $rootScope.deviceName);

  // placeholder image
  $scope.data = 'img/placeholder.png';

  
  $scope.submit = function() {
    // show waiting animation
    $scope.showLoading();

    //update data changing
    refChild.child('data').on('value', function(snapshot) {
      if(snapshot) {
        $scope.data = snapshot.val();
        console.log(snapshot.val());
      }
    });

    $timeout(function() {
      if (!$scope.data)
      Popup.showAlert('Network error!', 'Cannot get image.');
      $scope.hideLoading();
    }, 20000);
    
    //send request to server
    var time = new Date();
    refChild.update({
      request: "capture|" + time.getTime().toString()
    }, function (error) {

      //when request is sent
      if (error){
        Popup.showAlert('Failed!', 'Cannot send request.');
      }
    });
  };

  $scope.showLoading = function() {
    $ionicLoading.show({
      templateUrl: 'templates/loading-template.html'
    });
  }; 

  $scope.hideLoading = function() {
    $ionicLoading.hide();
  };

  //ionic.material.ink.displayEffect();
}