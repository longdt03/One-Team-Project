angular
  .module('one.controllers.signup', [])
  .controller('SignupCtrl', [
    '$scope',
    '$state',
    signupCtrl
]);

function signupCtrl($scope, $state) {
  $scope.createAccount = function(user) {
    if (!(user && user.email && user.pass && user.retype)) {
      alert('Please fill all field!');
      return;
    }
    if (user.pass === user.retype) {
      var ref = new Firebase(firebaseUrl);
      ref.createUser({
        email: user.email,
        password: user.pass
      }, function(error, userData) {
        if (error) {
          switch (error.code) {
            case 'EMAIL_TAKEN':
              alert('The new user account cannot be created because the email is already in use.');
              break;
            case 'INVALID_EMAIL':
              alert('The specified email is not a valid email.');
              break;
            default:
              alert('Error creating user:', error);
          }
        } else {
          alert('Successfully created user account!');
          $state.go('login');
        }
      });
    } else {
      alert('Password does not match!');
    }
  };
}
