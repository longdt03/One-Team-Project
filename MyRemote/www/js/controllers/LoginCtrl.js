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
    'UserService',
    loginCtrl
]);

function loginCtrl($state, $scope, $firebase, $firebaseAuth, $ionicLoading, $rootScope, AuthService, UserService) {
  var ref = new Firebase(firebaseUrl);

  ref.onAuth(function(authData) {
    console.log(authData);
    if(authData){
      $rootScope.id = AuthService.getId(authData);
      $rootScope.username = UserService.getName(authData);
    }
  });

  //init new user profile
  $scope.setProfile = function() {
    ref.child($rootScope.id).update({
      user_name: $rootScope.username,
      device: "",
      data: "",
      request: ""
    });
  };

  // Create a callback to handle the result of the authentication
  $scope.authHandler = function(error, authData) {
    
    //notify when an error occurs
    if (error) {
      alert("Password or email is invalid!");
    } else {
      //when login success
      console.log("Login success"+  $rootScope.id);
      
      //then go to the Main menu
      $state.go('main-menu');

      //init profile
      $scope.setProfile();
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
              console.log("Login Failed!", error);
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
        $scope.setProfile();
      }
    });
  };
  
  //sign in with email and pass 
  $scope.signInWithPassword = function(vm) {
    if(vm && vm.email && vm.pass){

      //show loading when start login
      $ionicLoading.show({
        template: 'Signing in ...'
      });

      // Log in with an email/password combination
      ref.authWithPassword({
        email    : vm.email,
        password : vm.pass
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
    $scope.provider = "google";
    signInWithProvider($scope.provider);
  };
}
