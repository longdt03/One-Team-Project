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

.factory('AuthService', function() {
  return {
    getName: function(authData) {
      switch(authData.provider) {
        case 'password':
          return authData.password.email.replace(/@.*/, '');
        case 'google':
          return authData.google.displayName;
        case 'facebook':
          return authData.facebook.displayName;
      }
    }
  }
});