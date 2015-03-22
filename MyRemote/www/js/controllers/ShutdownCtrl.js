angular
  .module('one.controllers.shutdown', [])
  .controller('ShutdownCtrl',[
    '$scope', 
    '$state', 
    '$rootScope', 
    'ShutdownOptions', 
    'TimeOptions', 
    shutdownCtrl
  ]);

function shutdownCtrl($scope, $state, $rootScope, ShutdownOptions, TimeOptions) {
  $scope.tasks = ShutdownOptions.all();
  $scope.selectedTask = $scope.tasks[0];
  $scope.timeOptions = TimeOptions.all();
  $scope.selectedTime = $scope.timeOptions[0];
  $scope.customTime = 10;

  $scope.submit = function() {
    //get data from the form and make request then send to server
    //YOUR CODE HERE
  };

  // back tho the Main Menu
  $scope.back = function() {
    $state.go('main-menu');
  };
}