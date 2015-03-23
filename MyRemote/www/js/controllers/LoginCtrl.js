angular
  .module('one.controllers.login', [])
  .controller('LoginCtrl',[
    '$state', 
    '$scope',
    '$firebase',
    '$firebaseAuth',
    '$ionicLoading',
    '$rootScope',
    'AuthService',
    loginCtrl
]);

function loginCtrl($state, $scope, $firebase, $firebaseAuth, $ionicLoading, $rootScope, AuthService) {
  var ref = new Firebase(firebaseUrl);

  ref.onAuth(function(authData) {
    if(authData){
      $rootScope.username = AuthService.getName(authData);
    }
  });

  // Create a callback to handle the result of the authentication
  $scope.authHandler = function(error, authData) {
    //notify when an error occurs
    if (error) {
      alert("Login Failed!", error);
    } else {
      console.log("Login success");
      //then go to the Main menu
      $state.go('main-menu');
    }
  };
  
  //sign in with email and pass 
  $scope.signIn = function() {
    if($scope.email && $scope.pass){

      //show loading when start login
      $ionicLoading.show({
        template: 'Signing in ...'
      });

      // Log in with an email/password combination
      ref.authWithPassword({
        email    : $scope.email,
        password : $scope.pass
      }, $scope.authHandler);

      //hide loading when checking finished
      $ionicLoading.hide();
    } else {
      // notify when email or password is not filled
      alert("Please fill email and password");
    }
  };

  //sign in with Google account
  $scope.signInWithGoogle = function() {

    // Or via popular OAuth providers ("facebook", "github", "google", or "twitter")
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {

          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          ref.authWithOAuthRedirect("google", function(error) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Success");
            }
          });
        }
      } else if (authData) {
        // user authenticated with Firebase
        console.log("Success!" + $rootScope.username);

        //then go to Main menu
        $state.go('main-menu'); 
      }
    });

  };
}
