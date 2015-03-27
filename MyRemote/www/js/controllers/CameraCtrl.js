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
    'Notification', 
    cameraCtrl
  ]);

function cameraCtrl($scope, $firebase, $rootScope, $state, $http, $ionicLoading, $timeout, Notification) {
  
  $scope.submit = function() {
    //first, get data to display before take a photo
    var ref = new Firebase (firebaseUrl);
    
    //update data changing
    ref.child($rootScope.id).child($rootScope.deviceName).child('data').on('value', function(snapshot) {
      if(snapshot) {
        $scope.data = snapshot.val();
      }
    });

    showLoading();
    
    //send request to server
    ref.child($rootScope.id).child($rootScope.deviceName).update({
      request: "capture"
    }, function (error) {

      //when request is sent
      Notification.noti(error);
    });

    $timeout(function() {
      hideLoading();
    }, 15000);
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