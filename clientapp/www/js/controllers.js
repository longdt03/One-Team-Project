angular.module('start.controllers', ['angular-websocket'])

.controller('appCtrl', function($scope, $websocket) {
  var self = this;
  self.ip = '127.0.0.1';
  self.port = '1234';
  self.time = 300;
  self.task = 'hi';
  

  self.submit = function() {
    var wsUrl = function() {
      return 'ws://'+self.ip+':'+self.port;
    };

    var request = function() {
      return self.task+'|'+self.time.toString();
    };

    var ws = $websocket(wsUrl());
    ws.send(request());
  };
});

