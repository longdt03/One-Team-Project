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
    cameraCtrl
  ]);

function cameraCtrl($scope,$firebase, $rootScope, $state, $http, $ionicLoading, $timeout) {
  
  $scope.capturePhoto = function() {
    //first, get data to display before take a photo
    // YOUR CODE HERE

    showLoading();
    
    //send request to server
    //YOUR CODE HERE

    $timeout(function() {
      hideLoading();
    }, 15000);
  };

  //go back to main-menu
  $scope.back= function() {
    $state.go('main-menu');
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