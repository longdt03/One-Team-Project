angular.module('myremote.services', ['firebase'])

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
  }
})

.factory('TimeOptions', function() {
  var timeOptions = [
    {name: 'Immediately', value: 0},
    {name: '10 seconds', value: 10},
    {name: '30 seconds', value: 30},
    {name: '1 minute', value: 60},
    {name: 'Other', other: true}
  ]
  return {
    all: function() {
      return timeOptions;
    }
  }
})