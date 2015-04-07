angular
  .module('one.controllers.login', [])
  .controller('LoginCtrl', [
    '$state', 
    '$scope',
    '$firebase',
    '$firebaseAuth',
    '$ionicLoading',
    '$rootScope',
    'AuthService',
    'UserService',
    'RememberMe',
    'Popup',
    loginCtrl
]);

function loginCtrl(
  $state, 
  $scope, 
  $firebase, 
  $firebaseAuth, 
  $ionicLoading, 
  $rootScope, 
  AuthService, 
  UserService, 
  RememberMe,
  Popup
  ) {

  var ref = new Firebase(firebaseUrl);
  $scope.rememberMe = {
    isChecked: RememberMe.isChecked()
  };

  if (RememberMe.isChecked()) {
    $scope.user = RememberMe.getUser();
  } else {
    $scope.user = {
      email: '',
      pass: ''
    };
  }

  ref.onAuth(function(authData) {
    if(authData){
      $rootScope.id = AuthService.getId(authData);
      $rootScope.username = UserService.getName(authData);
    }
  });

  //init new user profile
  $scope.updateUser = function() {
    ref.child($rootScope.id).update({});
  };

  // Create a callback to handle the result of the authentication
  $scope.authHandler = function(error, authData) {
    $ionicLoading.hide();
    //notify when an error occurs
    if (error) {
      switch (error.code) {
        case 'NETWORK_ERROR':
          var message = 'Unable to contact the OneRemote Server';
          Popup.showAlert('Login Failed!', message);
          break;
        default:
          Popup.showAlert('Login Failed!', error.message);
      }
    } else {
      //when login success
      RememberMe.checked($scope.rememberMe.isChecked);
      if ($scope.rememberMe.isChecked) {
        RememberMe.setUser($scope.user);
      }
      
      //then go to the Main menu
      $state.go('main-menu');

      //init profile
      $scope.updateUser();
    }
  };

  //sign in with provider
  var signInWithProvider = function(provider) {
    ref.authWithOAuthPopup(provider, function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {

          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          ref.authWithOAuthRedirect(provider, function(error) {
            if (error) {
              Popup.showAlert('Login Failed!', error.message);
            } else {
              console.log("Success");
            }
          });
        }
      } else if (authData) {
        // user authenticated with Firebase
        console.log("Success!" + $rootScope.id);

        //then go to Main menu
        $state.go('main-menu'); 

        //and init user profile
        $scope.updateUser();
      }
    });
  };
  
  //sign in with email and pass 
  $scope.signInWithPassword = function(user) {
    if(user && user.email && user.pass){

      //show loading when start login
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
      });

      // Log in with an email/password combination
      ref.authWithPassword({
        email    : user.email,
        password : user.pass
      }, $scope.authHandler);

      ;
    } else {
      // notify when email or password is not filled
      var message = 'Please fill email and password.'
      Popup.showAlert('Login Failed!', message);
    }
  };

  //sign in with Google account
  $scope.signInWithGoogle = function() {
    $scope.provider = "google";
    signInWithProvider($scope.provider);
  };
}
