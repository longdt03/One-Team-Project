angular
  .module('one.controllers.camera', [])
  .controller('CameraCtrl', [
    '$scope', 
    '$firebase', 
    '$rootScope', 
    '$http', 
    '$ionicLoading', 
    '$timeout',
    'Popup',
    cameraCtrl
  ]);

function cameraCtrl(
  $scope, 
  $firebase, 
  $rootScope, 
  $http, 
  $ionicLoading, 
  $timeout, 
  Popup
  ) {
  var ref = new Firebase (firebaseUrl);
  var refChild = ref.child($rootScope.id).child($rootScope.deviceName);

  // placeholder image
  $scope.data = 'img/placeholder.png';

  
  $scope.submit = function() {
    // show waiting animation
    showLoading();

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
      hideLoading();
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

  var showLoading = function() {
    $ionicLoading.show({
      templateUrl: 'templates/loading-template.html'
    });
  }; 

  var hideLoading = function() {
    $ionicLoading.hide();
  };

  ionic.material.ink.displayEffect();
}