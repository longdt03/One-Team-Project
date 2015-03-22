angular
  .module('one.controllers.menu', [])
  .controller('MenuCtrl', [
    '$scope',
    '$state', 
    '$ionicSideMenuDelegate', 
    menuCtrl
  ]);

function menuCtrl($scope, $state, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.shutdown = function() {
    $state.go('shut-down');
  };

  $scope.camera = function() {
    $state.go('camera');
  }
} 