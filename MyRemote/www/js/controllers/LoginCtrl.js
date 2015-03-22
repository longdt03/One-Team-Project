angular
  .module('one.controllers.login', [])
  .controller('LoginCtrl',[
    '$state', 
    '$scope', 
    loginCtrl
]);

function loginCtrl($state, $scope) {
  
  $scope.signIn = function() {
    $state.go('main-menu');
  }
}
