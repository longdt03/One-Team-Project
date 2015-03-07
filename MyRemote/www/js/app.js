// MyRemote App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var firebaseUrl = "https://mychatex.firebaseio.com";

// 'myremote.services' is found in services.js
// 'myremote.controllers' is found in controllers.js
angular.module('myremote', ['ionic', 'myremote.controllers', 'mychat.services', 'firebase'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $state, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Global Variables
    $rootScope.firebaseUrl = firebaseUrl;

    Auth.$onAuth(function (authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid);
      } else {
        console.log("Logged out");
        $ionicLoading.hide();
        $state.go('login');
      }
    });
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // State to represent Login View
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // State to represent Main Menu View
  .state('main-menu', {
    url: '/main-menu',
    templateUrl: 'templates/main-menu.html',
    controller: 'MenuCtrl'
  })

  // State to represent About View
  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
