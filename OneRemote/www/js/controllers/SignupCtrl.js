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
      $scope.result = 'Signup failed! - Please fill all fields.';
      return;
    }

    if (!isValidEmail(user.email)) {
      Popup.showAlert('Signup failed!', 'Cannot use this email!');
      return;
    }

    if (user.pass !== user.retype) {
      Popup.showAlert('Signup failed', 'Retype password does not match.');
      $scope.result = 'Signup failed - Retype password does not match.';
      return;
    }

    var ref = new Firebase(firebaseUrl);
    ref.createUser({
      email: user.email,
      password: user.pass
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case 'NETWORK_ERROR':
            var message = 'Unable to contact the OneRemote Server';
            Popup.showAlert('Signup Failed!', message);
            break;
          default:
            Popup.showAlert('Signup failed!', error.message);
        }
      } else {
        Popup.showAlert('Signup successful!', 'Welcome to OneRemote.');
        $scope.result = 'Signup successful! - Welcome to OneRemote.';
        $state.go('login');
      }
    });
  };

  var isValidEmail = function(email) {
    // User mail cannot contain these words
    var invalidWords = ['admin', 'support', 'root'];

    var standardizeEmail = email.toLowerCase();
    for (index = 0; index < invalidWords.length; index++) {
      if (standardizeEmail.indexOf(invalidWords[index]) >= 0) {
        return false;
      }
    }
    return true;
  }

  ionic.material.ink.displayEffect();
}
