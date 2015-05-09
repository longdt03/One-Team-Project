angular
  .module('one.controllers.shutdown', [])
  .controller('ShutdownCtrl',[
    '$scope', 
    '$state', 
    '$firebase',
    '$rootScope', 
    'ShutdownOptions',
    'Popup',
    shutdownCtrl
  ]);

function shutdownCtrl($scope, $state, $firebase, $rootScope, ShutdownOptions, Popup) {

  var ref = new Firebase(firebaseUrl + '/' + $rootScope.id);
  var refChild = ref.child($rootScope.deviceName);
  
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
    $scope.time = $scope.data.selectedTask.time ? $scope.data.timer.minute * 60 : 0; 

    //make request
    $scope.request = $scope.data.selectedTask.msg + '|' + $scope.time.toString();
    
    //send request to server     
    refChild.update({
      request: $scope.request
    }, function(error){

      //notify when request is sent
      if(error){
        Popup.showAlert('Notification','Failed to send request');
      } else {
        Popup.showAlert('Notification', 'Request sent success');
      }
    });
  };

  ionic.material.ink.displayEffect();
}