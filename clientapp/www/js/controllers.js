angular.module('start.controllers', ['angular-websocket'])

.controller('appCtrl', function($scope, $websocket) {
  var self = this;
  self.status = 'Not connected';
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
  self.ws = $websocket();

    
  self.connect = function() {
    //connect to the server 
    var wsUrl = function() {
      return 'ws://'+self.ip+':'+self.port;
    };
    
    self.ws = $websocket(wsUrl());
    self.ws.onOpen(function() {
      self.status = 'Connected';
    });
    self.ws.onClose(function() {
      self.status = 'Not connected';
    });
  };

  self.send = function() {
    //send request to server  
    var request = function() {
      return self.defaultTask.task+'|'+self.time.toString();
    };
    self.ws.send(request());
  };
  
});
  