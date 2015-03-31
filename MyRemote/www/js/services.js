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

.factory('DevicesList', function() {
  var service = {
    getDevices: getDevices
  };
  return service;

  //get device name from firebas
  function getDevices(user) {
    var count = 0;

    //array of devices
    var devices = [];

    // add name to the devices
    user.once('value', function(snap) {
       snap.forEach(function(data) {

        //get device name
        var obj = {name: data.key()}

        //then assign to devices array 
        devices[count] = obj;
        count ++;
      });
    });
    return devices;
  };
})

.factory('AuthService', function() {
  var service = {
    getId: getId,
    getName: getName
  }
  return service;

  function getId(authData) {
    var data = authData.uid.toString().split(':');
    return data[1];
  }

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

.factory('UserService', function() {
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

.factory('Notification', function() {
  return {
    noti: function(err) {
      if (err){
        console.log ('Request sent failed');
      } else {
        console.log('Request sent success');
      }
    }
  }
})

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