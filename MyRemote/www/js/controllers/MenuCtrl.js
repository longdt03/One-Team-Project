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
  AuthService
  ) {
  
  // devices list
  var ref = new Firebase(firebaseUrl);
  var refChild = ref.child($rootScope.id);

  $scope.allDevices = [];
  $scope.allDevices = [
    {name: 'kienPC'},
    {name: 'vuPC'}
  ];
  // $scope.allDevices = DevicesList.getDevices(refChild);

  $scope.data = {
    selectedDevice: {name: ""}
  };
  
  // choose device from list
  $scope.chooseDevice = function(device) {
    $scope.data.selectedDevice = device;
    $rootScope.deviceName = device.name;
  };

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

    //reset user information
    UserService.reset();
      
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