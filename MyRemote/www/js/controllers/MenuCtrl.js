angular
  .module('one.controllers.menu')
  .controller('MenuCtrl', ['$scope', '$state', '$ionicLoading','$ionicSideMenuDelegate', menuCtrl]);

function menuCtrl($scope, $state, $ionicSideMenuDelegate, $ionicLoading) {
  $scope.toggleSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.shutdown = function() {
    $state.go('shut-down');    
   };

  $scope.camera = function() {
    $state.go('camera');
  };
} 