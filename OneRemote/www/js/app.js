var firebaseUrl = 'https://one-app.firebaseio.com';

angular.module('one', [
  'ionic',
  'firebase',
  'one.controllers',
  'one.services'
])

.run(function($ionicPlatform, $rootScope) {
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

    // Display status connection
    var connectedRef = new Firebase(firebaseUrl + '/.info/connected');
    connectedRef.on('value', function(snapshot) {
      if (snapshot.val()) {
        console.log('Connected');
      } else {
        console.log('Disconnected');
      }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // State to represent Login View
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignupCtrl'
  })

  // State to represent Main Menu View
  .state('main-menu', {
    cache: false,
    url: '/main-menu',
    templateUrl: 'templates/main-menu.html',
    controller: 'MenuCtrl'
  })

  // State to represent About View
  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html'
  })

  .state('shut-down',{
    cache: false,
    url: '/shut-down',
    templateUrl: 'templates/shut-down.html',
    controller: 'ShutdownCtrl'
  })

  .state('camera',{
    url: '/camera',
    templateUrl: 'templates/camera.html',
    controller: 'CameraCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

