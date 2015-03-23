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
  // $scope.logOut = function() {
  //   var ref = new Firebase(firebaseUrl);

  //   //log out of application
  //   ref.unauth().then(function(){

  //     //then stop listening for changes
  //     ref.offAuth(function(){
  //       console.log("Service off");
  //     });

  //     //anounce
  //     console.log("Log out");
  //   });
  // };

} 