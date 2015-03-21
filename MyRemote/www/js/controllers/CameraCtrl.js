angular
  .module('one.controllers.camera')
  .controller('CameraCtrl', ['$scope', '$firebase', '$rootScope', '$state', '$http', '$ionicLoading', '$timeout', cameraCtrl]);

function cameraCtrl($scope,$firebase, $rootScope, $state, $http, $ionicLoading, $timeout) {
  var ref = new Firebase(firebaseUrl);
  
  ref.child($rootScope.id).child('data').on('value', function(snapshot) {
    $scope.data = snapshot.val();
  });

  $scope.capturePhoto = function() {
    var time = new Date();
    ref.child($rootScope.id).update({request: "capture|" + time.getTime().toString()});
    showLoading();
    ref.child($rootScope.id).child('data').on(function(snapshot){
        $scope.data = snapshot.val();
    });

    $timeout(function() {
      hideLoading();
      showPhoto();
    }, 15000);
  };

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