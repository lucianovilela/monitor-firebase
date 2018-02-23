// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();

    }
	//window.ga.startTrackerWithId('UA-XXXXXXXX-1');


  });
})

.config(function($stateProvider, $urlRouterProvider ) {
  var config = {
      apiKey: "AIzaSyD03tfMzN7KtNrydxx73ScCDeuXhpDjZdg",
     // authDomain: "ehatdig.firebaseapp.com",
      databaseURL: "https://ehatdig.firebaseio.com",
    //  storageBucket: "ehatdig.appspot.com",
    };
   firebase.initializeApp(config);
   

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.home', {
      url: '/home',
      views: {
             'menuContent': {
               templateUrl: 'templates/home.html',
               controller: 'HomeCtrl'
             }
           }
      })
   .state('app.graph', {
	  url: '/graph/:idCommand',
	  views: {
			 'menuContent': {
			   templateUrl: 'templates/graph.html',
			   controller: 'GraphCtrl'
			 }
		   }
    })

    .state('app.preferences', {
		url: '/preferences',
	  views: {
			 'menuContent': {
			   templateUrl: 'templates/preferences.html',
			   controller: 'PreferencesCtrl'
			 }
		   }

     });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');


});
