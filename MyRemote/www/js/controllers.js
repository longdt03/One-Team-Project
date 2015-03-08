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
    $ionicLoading.hide();
    $state.go('login');
  };

  $scope.shutdown = function(){
    $state.go('shut-down');    
   };

  $scope.camera = function(){
    $state.go('camera');
  };

   $scope.fileTransfer = function(){
    $state.go('file-transfer');
  };

})

.controller('ShutdownCtrl',function($scope,$state){

    $scope.tasks = [
        {name: 'Shutdown', task: 'shutdown'}, 
        {name: 'Log off', task: 'log_off'},
        {name: 'Hibernate', task: 'hibernate'},
        {name: 'Restart', task: 'restart'}
    ];

    $scope.times = [
        {name: 'Immediately', time: '0'},
        {name: '10 seconds', time: '10'},
        {name: '30 seconds', time: '30'},
        {name: '1 minute', time: '60'}
    ];

    $scope.timeDisabled = false;
    $scope.timeSelected = $scope.times[0]; 
    $scope.taskSelected = $scope.tasks[0];
    
    $scope.timeDisabled = ($scope.taskSelected == $scope.tasks[1] 
                || $scope.taskSelected == $scope.tasks[2]);
    
    $scope.submit =function(){
        alert ($scope.timeSelected.time);
    };

});