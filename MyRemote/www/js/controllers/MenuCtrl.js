angular
  .module('one.controllers.menu', [])
  .controller('MenuCtrl', [
    '$scope',
    '$state', 
    '$ionicSideMenuDelegate',
    '$rootScope', 
    '$firebaseAuth',
    '$ionicPopover',
    '$window',
    'DevicesList',
    menuCtrl
  ]);

function menuCtrl(
  $scope, 
  $state, 
  $ionicSideMenuDelegate, 
  $rootScope, 
  $firebaseAuth,
  $ionicPopover,
  $window,
  DevicesList) {
  
  // devices list
  var ref = new Firebase(firebaseUrl);
  var vm = this;
  $scope.allDevices = [];
  $scope.allDevices = DevicesList.getDevices(ref.child($rootScope.id));
  $scope.data = {
    selectedDevice: {name: ""}
  }
  console.log($scope.data);
  //display user name in the top of side menu
  $scope.username = $rootScope.username;
  
  //go to side menu left
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //go to Shut down interface
  $scope.shutdown = function() {
    
    //alert when no device was choosen
    if($scope.data.selectedDevice.name === "") {
      alert ("Please choose device");
    } else {

      //assign deviceName
      $rootScope.deviceName = $scope.data.selectedDevice.name;

      //then go to ShutDown
      $state.go('shut-down');
    }
  };

  //Goto camera interface
  $scope.camera = function() {
    if($scope.data.selectedDevice.name === "") {
      alert ("Please choose device");
    } else {
      $rootScope.deviceName = $scope.data.selectedDevice.name;
      $state.go('camera');
    }
  };

  //log out 
  $scope.logOut = function() {
    
    //log out of application
    var ref = new Firebase(firebaseUrl);
    ref.unauth();
    
    // restart app
    $window.location.reload();

    // go to login
    $state.go('login');
  };

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/main-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
} 