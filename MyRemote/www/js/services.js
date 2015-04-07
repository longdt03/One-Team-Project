angular.module('one.services', ['firebase'])

.factory('ShutdownOptions', function() {
  var tasks = [
    {id: 0, name: 'Shutdown', msg: 'shutdown', time: true},
    {id: 1, name: 'Restart', msg: 'restart', time: true},
    {id: 2, name: 'Hibernate', msg: 'hibernate', time: false},
    {id: 3, name: 'Log off', msg: 'log_off', time: false}
  ];

  return {
    all: function() {
      return tasks;
    }
  };
})

.factory('DevicesList', ['AuthService', function(AuthService) {
  var service = {
    getDevices: getDevices
  };
  return service;

  //get device name from firebas
  function getDevices(user) {
    var isOnline;
    var count = 0;

    //array of devices
    var devices = [];

    // add name to the devices
    user.once('value', function(snap) {
      snap.forEach(function(data) {
        
        //get device name
        var obj = {name: data.key()};
        isOnline = AuthService.checkConnect(user.child(obj.name));
        console.log(isOnline);

        //then assign to devices array 
        if (isOnline) {
          devices[count] = obj;
          count ++;
        }
      });
    });
    return devices;
  };
}])

.factory('AuthService', function() {
  var service = {
    getId: getId,
    noti: noti,
    checkConnect: checkConnect
  }
  return service;

  //get id address
  function getId(authData) {
    var data = authData.uid.toString().split(':');
    return data[1];
  }

  //notify when request sent
  function noti(err) {
    if (err){
      console.log ('Request sent failed');
    } else {
      console.log('Request sent success');
    }
  }

  //check device's connnection
  function checkConnect(device) {
    var bool = {val: false};
  
    device.once('value', function(snap) {
      var status = snap.val().status;
      
      //if status is defined
      if (status) {
        var val = status.toString().split('|');
        console.log(val[0]);
        if (val[0] == "online") {
          bool.val = true;
        }
      }
    });

    return bool.val;
  } 
})

.factory('UserService', function($rootScope) {
  var id = "";
  var username = "";
  
  var service = {
    getName: getName
  }

  return service;

  function getName(authData) {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*/, '');
      case 'google':
        return authData.google.displayName;
      case 'facebook':
        return authData.facebook.displayName;
    }
  }
})

.factory('Popup', ['$ionicPopup','$timeout', function($ionicPopup, $timeout) {
  var service = {
    showAlert: showAlert
  };
  return service;

  function showAlert(title, template) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
    $timeout(function() {
      alertPopup.close();
    }, 3000);
  }
}])

.factory('RememberMe', ['$window', function($window) {
  var service = {
    setUser: setUser,
    getUser: getUser,
    isChecked: isChecked,
    checked: checked
  }
  return service;

  function setUser(user) {
    $window.localStorage['email'] = user.email;
    $window.localStorage['pass'] = user.pass;
  }

  function getUser() {
    var user = {
      email: $window.localStorage['email'],
      pass: $window.localStorage['pass']
    }
    return user;
  }

  function isChecked() {
    return $window.localStorage['isChecked'] === "true";
  }

  function checked(isChecked) {
    $window.localStorage['isChecked'] = isChecked;
  }
}]);