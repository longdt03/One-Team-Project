angular.module('myremote.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicLoading, $rootScope) {
  $scope.signIn = function(user) {
    if (true || user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Signing In...'
      });
      $ionicLoading.hide();
      $state.go('main-menu');
    }
  };
})

.controller('MenuCtrl', function($scope, $state, $ionicSideMenuDelegate) {
  $scope.toggleSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});