angular
  .module('one.controllers.signup', [])
  .controller('SignupCtrl', [
    '$scope',
    '$state',
    'Popup',
    signupCtrl
]);

function signupCtrl($scope, $state, Popup) {
  $scope.createAccount = function(user) {
    if (!(user && user.email && user.pass && user.retype)) {
      Popup.showAlert('Signup failed!', 'Please fill all fields.');
      return;
    }
    if (user.pass === user.retype) {
      var ref = new Firebase(firebaseUrl);
      ref.createUser({
        email: user.email,
        password: user.pass
      }, function(error, userData) {
        if (error) {
          Popup.showAlert('Signup failed!', error.message);
        } else {
          Popup.showAlert('Signup successful!', 'Welcome to OneRemote.');
          $state.go('login');
        }
      });
    } else {
      Popup.showAlert('Signup failed', 'Retype password does not match.');
    }
  };
}
