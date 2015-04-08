angular
  .module('one.controllers.camera', [])
  .controller('CameraCtrl', [
    '$scope', 
    '$firebase', 
    '$rootScope', 
    '$state', 
    '$http', 
    '$ionicLoading', 
    '$timeout',
    'Popup', 
    '$cordovaToast',
    cameraCtrl
  ]);

function cameraCtrl(
  $scope, 
  $firebase, 
  $rootScope, 
  $state, 
  $http, 
  $ionicLoading, 
  $timeout, 
  Popup,
  $cordovaToast
  ) {
  var ref = new Firebase (firebaseUrl);
  var refChild = ref.child($rootScope.id).child($rootScope.deviceName);

  // placeholder image
  $scope.data = 'img/placeholder.png';
  $cordovaToast.show('Here is a message', 'long', 'bottom');
  
  $scope.submit = function() {

    // show waiting animation
    // showLoading();

    //update data changing
    refChild.child('data').on('value', function(snapshot) {
      if(snapshot) {
        $scope.data = snapshot.val();
        console.log(snapshot.val());
      }
    });

    $timeout(function() {
      if (!$scope.data)
      Popup.showAlert('Network error!', 'Slow connection.');
      hideLoading();
    }, 20000);
    
    //send request to server
    var time = new Date();
    refChild.update({
      request: "capture|" + time.getTime().toString()
    }, function (error) {

      //when request is sent
      if (error){
        // $cordovaToast.showLongBottom('Here is a message');
        // Popup.showAlert('Failed!', 'Cannot send request.');
      } else {
        // $cordovaToast.showLongBottom('Here is a message');
        // Popup.showAlert('Successful!', 'Request sent.');
      }
    });
  };

  var showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive" icon="bubbles"></ion-spinner>'
    });
  }; 

  var hideLoading = function() {
    $ionicLoading.hide();
  };

}