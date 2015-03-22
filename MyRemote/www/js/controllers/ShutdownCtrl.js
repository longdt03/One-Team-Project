angular
  .module('one.controllers.shutdown', [])
  .controller('ShutdownCtrl',[
    '$scope', 
    '$state', 
    '$rootScope', 
    'ShutdownOptions', 
    shutdownCtrl
  ]);

function shutdownCtrl($scope, $state, $rootScope, ShutdownOptions) {
  $scope.tasks = ShutdownOptions.all();
  $scope.data = {
    selectedTask: $scope.tasks[0],
    timer: {
      minute: 0,
      second: 0,
    }
  };

  $scope.submit = function() {
    //get data from the form and make request then send to server
    //YOUR CODE HERE
  };

  // back tho the Main Menu
  $scope.back = function() {
    $state.go('main-menu');
  };
}