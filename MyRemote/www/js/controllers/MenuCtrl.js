angular
  .module('one.controllers.menu', [])
  .controller('MenuCtrl', [
    '$scope',
    '$state', 
    '$ionicSideMenuDelegate',
    '$rootScope', 
    '$firebaseAuth',
    menuCtrl
  ]);

function menuCtrl($scope, $state, $ionicSideMenuDelegate, $rootScope, $firebaseAuth) {
  // devices list
  $scope.allDevices = [
    {name: 'LongPC'},
    {name: 'KienPC'},
    {name: 'HienPC'}
  ];
  $scope.selectedDevice = {};

  //display user name in the top of side menu
  $scope.username = $rootScope.username;
  
  //go to side menu left
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //go to Shut down interface
  $scope.shutdown = function() {
    $state.go('shut-down');
  };

  //Goto camera interface
  $scope.camera = function() {
    $state.go('camera');
  };

  //log out 
  $scope.logOut = function() {
    //log out of application
    //YOUR CODE HERE
    var ref = new Firebase(firebaseUrl);
    ref.unauth();
    //then goto login interface
    $state.go('login');
  };

} 