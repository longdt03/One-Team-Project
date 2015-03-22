angular
  .module('one.controllers.login', [])
  .controller('LoginCtrl',[
    '$state', 
    '$scope',
    '$firebase',
    '$firebaseAuth',
    '$ionicLoading',
    loginCtrl
]);

function loginCtrl($state, $scope, $firebase, $firebaseAuth, $ionicLoading) {
   var ref = new Firebase(firebaseUrl);

  // Create a callback to handle the result of the authentication
  $scope.authHandler = function(error, authData) {
    //hide loading when checking finished
    $ionicLoading.hide();

    if (error) {
      alert("Login Failed!", error);
    } else {
      alert("Authenticated successfully with payload:", authData);
      //then go to the Main menu
      $state.go('main-menu');
    }
  };
  
  //sign in with email and pass 
  $scope.signIn = function() {
    if($scope.email && $scope.pass){
      $ionicLoading.show({
        template: 'Signing in ...'
      });

      // Log in with an email/password combination
      ref.authWithPassword({
        email    : $scope.email,
        password : $scope.pass
      }, $scope.authHandler);
    } else {
      alert("Please fill email and password");
    }
  };

  //sign in with Google account
  $scope.signInWithGoogle = function() {
    $ionicLoading.show({
      template: 'Signing in ....'
    });

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
              // We'll never get here, as the page will redirect on success.
            }
          });
        }
      } else if (authData) {

        // user authenticated with Firebase
        console.log("Success!"); 
      }
    }, $scope.authHandler);

  };
}
