angular
  .module('one.controllers.shutdown', [])
  .controller('ShutdownCtrl',[
    '$scope', 
    '$state', 
    '$firebase',
    '$rootScope', 
    'ShutdownOptions',
    'Notification',
    shutdownCtrl
  ]);

function shutdownCtrl($scope, $state, $firebase, $rootScope, ShutdownOptions, Notification) {
  var vm = this;
  $scope.tasks = ShutdownOptions.all();
  $scope.data = {
    selectedTask: $scope.tasks[0],
    timer: {
      minute: 0
    }
  };

  //get data from the form and make request then send to server
  $scope.submit = function() {

    //calculate time
    $scope.time = $scope.data.timer.minute * 60; n

    //make request
    $scope.request = $scope.data.selectedTask.msg + '|' + $scope.time.toString();
    
    //send request to server 
    var ref = new Firebase(firebaseUrl);
    
    ref.child($rootScope.id).child($rootScope.deviceName).update({
      request: $scope.request
    }, function(error){

      //notify when request is sent
      Notification.noti(error);
    });
  };
}