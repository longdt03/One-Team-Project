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
  Popup) {
  var ref = new Firebase (firebaseUrl);
  var refChild = ref.child($rootScope.id).child($rootScope.deviceName);

  //get lastest data to display before take a photo
  refChild.child('data').on('value', function(snapshot) {
    if(snapshot) {
      $scope.data = snapshot.val();
    }
  });
  
  $scope.submit = function() {

    // show waiting animation
    showLoading();

    //update data changing
    refChild.child('data').on('value', function(snapshot) {
      if(snapshot) {
        $scope.data = snapshot.val();
      }
    });

    $timeout(function() {
      if (!$scope.data)
      alert('Connect error');
    }, 20000);
    
    //send request to server
    refChild.update({
      request: "capture"
    }, function (error) {

      //when request is sent
      if (error){
        Popup.showAlert('Notif','Failed to send request');
      } else {
        Popup.showAlert('Notif','Request sent success');
      }
    });
  };

  var showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  }; 

  var hideLoading = function() {
    $ionicLoading.hide();
  };

}