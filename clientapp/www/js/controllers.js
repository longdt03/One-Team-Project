'use strict';

angular.module('start.controllers', ['ngWebsocket'])

.controller('appCtrl', function($scope, $websocket) {
  var self = this;
  self.ip = '127.0.0.1';
  self.port = '1234';
  self.time = 300;
  self.task = 'shutdown';
  

  self.submit = function() {
    var wsUrl = function() {
      return 'ws://'+self.ip+':'+self.port;
    };

    var request = function() {
      return self.task+'|'+self.time.toString();
    };

    var ws = $websocket.$new({
      url: wsUrl(),
      reconnect: false // set true then it will reconnect after 2 seconds
    });

    ws.$on('$open', function () {
      console.log('Connected!');
      ws.$$ws.send(request()); // send a message to the websocket server
    });
    ws.$on('$error', function() {
      console.log('An error has occupied!');
    });

    ws.$on('$close', function () {
      console.log('Disconnected!');
    });
  };
});

