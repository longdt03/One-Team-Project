angular.module('start.controllers', ['angular-websocket'])

.controller('appCtrl', function($scope, $websocket) {
  var self = this;
  self.tasks = [
    {name: 'Shutdown', task: 'shutdown'}, 
    {name: 'Log off', task: 'log_off'},
    {name: 'Hibernate', task: 'hibernate'},
    {name: 'Restart', task: 'restart'}
  ];

  self.ip = "207.0.0.1";
  self.port = "1234";
  self.time = 300;
  self.defaultTask = self.tasks[0];

  self.submit = function() {
    //connect to the server 
    var wsUrl = function() {
      return 'ws://'+self.ip+':'+self.port;
    };
    
    var ws = $websocket(wsUrl());
   
    //send request to server  
    var request = function() {
      return self.defaultTask.task+'|'+self.time.toString();
    };
    ws.send(request());
  }
});

