angular
  .module('one.controllers.menu', [])
  .controller('MenuCtrl', [
    '$scope',
    '$state', 
    '$ionicSideMenuDelegate',
    '$rootScope', 
    '$firebaseAuth',
    '$ionicPopover',
    'DevicesList',
    'UserService',
    'AuthService',
    'Popup',
    menuCtrl
  ]);

function menuCtrl(
  $scope, 
  $state, 
  $ionicSideMenuDelegate, 
  $rootScope, 
  $firebaseAuth,
  $ionicPopover,
  DevicesList,
  UserService,
  AuthService,
  Popup
  ) {
  
  // devices list
  var ref = new Firebase(firebaseUrl);
  var refChild = ref.child($rootScope.id);

  $scope.allDevices = [];
  $scope.allDevices = DevicesList.getDevices(refChild);

  $scope.data = {
    selectedDevice: {name: $rootScope.deviceName}
  };
  
  // choose device from list
  $scope.chooseDevice = function(device) {
    $scope.data.selectedDevice = device;
    $rootScope.deviceName = device.name;
  };

  //display user name in the top of side menu
  $scope.username = $rootScope.username;
  
  //go to side menu left
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //go to Shut down interface
  $scope.shutdown = function() {
    
    if($scope.data.selectedDevice.name) {
      //assign deviceName
      $rootScope.deviceName = $scope.data.selectedDevice.name;
      
      //then go to ShutDown
      $state.go('shut-down');
      
    } else { 
      //alert when no device was choosen
      Popup.showAlert('No Device!', 'Please choose your device in sidemenu.');      
    }
  };

  //Goto camera interface
  $scope.camera = function() {
    if($scope.data.selectedDevice.name) {
      $rootScope.deviceName = $scope.data.selectedDevice.name;
      $state.go('camera');
    } else {
      Popup.showAlert('No Device!', 'Please choose your device in sidemenu.');  
    }
  };

  //log out 
  $scope.logOut = function() {
    
    //log out of application
    var ref = new Firebase(firebaseUrl);
    ref.unauth();
    $rootScope.deviceName = "";  
    //then goto login interface
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