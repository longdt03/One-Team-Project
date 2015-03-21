angular
  .module('one.controllers.menu', [])
  .controller('MenuCtrl', [
    '$scope', 
    '$ionicSideMenuDelegate', 
    menuCtrl
  ]);

function menuCtrl($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
} 