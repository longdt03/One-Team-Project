angular.module('start.controllers', ['angular-websocket'])

.controller('appCtrl', function($scope, $websocket) {
  var self = this;
  self.ip = '127.0.0.1';
  self.port = '1234';
  self.time = 300;
  self.tasks = [
    {name: 'Shutdown', task: 'shutdown'}, 
    {name: 'Log off', task: 'log_off'},
    {name: 'Hibernate', task: 'hibernate'},
    {name: 'Restart', task: 'restart'}
  ];
  self.defaultTask = self.tasks[0];

  self.submit = function() {
    var wsUrl = function() {
      return 'ws://'+self.ip+':'+self.port;
    };

    var request = function() {
      return self.defaultTask.task+'|'+self.time.toString();
    };

    var ws = $websocket(wsUrl());
    ws.send(request());
  };
});

