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

  var ref = new Firebase(firebaseUrl);
  var refChild = ref.child($rootScope.id).child($rootScope.deviceName);

  $scope.submit = function(task) {
    var time = new Date();
    refChild.update({
      request: task + '|' + time.getTime().toString()
    }, function (error) {
      if (error){
        Popup.showAlert('Failed!', 'Cannot send request.');
      }
    });
    console.log(task);
  };

  ionic.material.ink.displayEffect();
}