angular
  .module('one.controllers.presentation', [])
  .controller('PresentCtrl', [
    '$scope',
    '$firebase',
    '$rootScope',
    'Popup',
    presentCtrl
  ]);

function presentCtrl(
  $scope,
  $firebase,
  $rootScope,
  Popup
  ) {

  var refChild = new Firebase(firebaseUrl + '/' + $rootScope.id 
                          + '/' + $rootScope.deviceName);

  $scope.submit = function(task) {
    var time = new Date();
    $scope.request = task + '|' + time.getTime().toString();
    refChild.update({
      request: $scope.request
    }, function (error) {
      if (error){
        Popup.showAlert('Failed!', 'Cannot send request.');
      }
    });
  };

  //ionic.material.ink.displayEffect();
}