angular.module('myremote.controllers', [])

.controller('LoginCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicLoading) {

  var usersRef = new Firebase('https://one-app.firebaseio.com/');
  
  $scope.login = function(id) {
    // Check if id exist here
    usersRef.child(id).once('value',function(snapshot){
      var exists = (snapshot.val() !== null);
      if(exists){
      	$rootScope.id = id;
        promptPassword(); 
      } else {
        alert('user' + id + ' do not exist!');
      }
    });
    // If id exists then popup to prompt password
    
    

  };

  $scope.checkpass = function(pass) {
    // Check if id exist here
    console.log($rootScope.id);
    usersRef.child($rootScope.id).child('password').once('value',function(snapshot){
      var a = (snapshot.val() === pass);
      if(a){
        $state.go('main-menu');
      } else {
        alert('password' + pass + ' do not exist!');
      }
    });
    

  }; 
  
  var promptPassword = function() {
    var promptPopup =   $ionicPopup.prompt({
      title: 'Authentication',
      template: 'Please enter your password.',
      inputType: 'password',
      inputPlaceholder: 'Password'
    });
    promptPopup.then(function(res) {
   		$scope.checkpass(res);

      // $state.go('main-menu');
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

.controller('ShutdownCtrl',function($scope, $state, Task, ShutdownOptions, TimeOptions) {
  $scope.tasks = ShutdownOptions.all();
  $scope.selectedTask = $scope.tasks[0];
  $scope.timeOptions = TimeOptions.all();
  $scope.selectedTime = $scope.timeOptions[0];

  $scope.submit = function(){
    $scope.task = Task("171253");

    $scope.task.data = this.selectedTask.msg + '|' 
                        + this.selectedTime.value.toString()||'0';

    $scope.task.$save();
  }


  $scope.back = function() {
    $state.go('main-menu');
  }
});