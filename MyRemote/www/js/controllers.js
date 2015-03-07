angular.module('myremote.controllers', [])

.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicLoading, $firebaseAuth) {

  var ref = new Firebase(firebaseUrl);
  var auth = $firebaseAuth(ref);

  $scope.signIn = function(user) {
    if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Signing In...'
      });

      auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function(authData) {
        console.log("Logged in as: ", authData.uid);
        $ionicLoading.hide();
        $state.go('main-menu');
      }).catch(function(error) {
        alert("Authentication failed: " + error.message);
        $ionicLoading.hide();
      });
    } 
    else {
      alert("Please fill all details");
    }
  };
})

.controller('MenuCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicLoading, Auth) {
  Auth.$onAuth(function(authData) {
    $scope.authData = authData;
  });

  $scope.toggleSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.logOut = function() {
    $ionicLoading.show({
      template: 'Logging Out...'
    });
    Auth.$unauth();
  };
});