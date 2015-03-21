angular
  .module('one.controllers.shutdown')
  .controller('ShutdownCtrl',['$scope', '$state', '$rootScope', 'ShutdownOptions', 'TimeOptions', shutdownCtrl]);

function shutdownCtrl($scope, $state, $rootScope, ShutdownOptions, TimeOptions) 
  $scope.tasks = ShutdownOptions.all();
  $scope.selectedTask = $scope.tasks[0];
  $scope.timeOptions = TimeOptions.all();
  $scope.selectedTime = $scope.timeOptions[0];
  $scope.customTime = 10;

  $scope.submit = function() {
    var userRef = new Firebase(firebaseUrl);
    this.selectedTime.value = (this.selectedTime.other ? this.customTime * 60 : this.selectedTime.value);
    
    child($rootScope.id).update({
      request: this.selectedTask.msg + '|' + (this.selectedTask.time? this.selectedTime.value.toString(): '0')
    });
  };

  $scope.back = function() {
    $state.go('main-menu');
  };
}