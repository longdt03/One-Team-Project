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
    'AuthService', 
    cameraCtrl
  ]);

function cameraCtrl($scope, $firebase, $rootScope, $state, $http, $ionicLoading, $timeout, AuthService) {
  var ref = new Firebase (firebaseUrl);
  var refChild = ref.child($rootScope.id).child($rootScope.deviceName);

  //first check divice's connection
  $scope.connect = AuthService.checkConnect(refChild);

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
    
    //send request to server
    refChild.update({
      request: "capture"
    }, function (error) {

      //when request is sent
      AuthService.noti(error);
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