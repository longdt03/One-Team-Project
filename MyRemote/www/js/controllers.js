angular.module('myremote.controllers', [])

.controller('LoginCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicLoading) {
  
  $scope.login = function(id) {
    // Check if id exist here

    // If id exists then popup to prompt password
    promptPassword();

  };
  
  var promptPassword = function() {
    var promptPopup =   $ionicPopup.prompt({
      title: 'Authentication',
      template: 'Please enter your password.',
      inputType: 'password',
      inputPlaceholder: 'Password'
    });
    promptPopup.then(function(res) {
      $state.go('main-menu');
    });
  };

  

})

.controller('MenuCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicLoading) {

  $scope.toggleSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
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

.controller('ShutdownCtrl',function($scope, $state, ShutdownOptions, TimeOptions) {
  $scope.tasks = ShutdownOptions.all();
  $scope.selectedTask = $scope.tasks[0];
  $scope.timeOptions = TimeOptions.all();
  $scope.selectedTime = $scope.timeOptions[0];
  $scope.customTime = 0;
  $scope.submit = function() {
    console.log(this.selectedTask);
    console.log(this.selectedTime.value || this.customTime);
  }
  $scope.back = function() {
    $state.go('main-menu');
  }
});