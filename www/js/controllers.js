angular.module('starter.controllers', ['firebase', 'googlechart'])
.controller('AppCtrl', function($scope, $stateParams, $firebaseArray) {
//	window.ga('send', 'pageview');
//	window.ga('send', { hitType: 'pageview', page: "/"});


})
.controller('HomeCtrl', function($scope, $stateParams, $firebaseArray) {
//	window.ga('send', { hitType: 'pageview', page: "/monitor"});
  var itemsRef =  firebase.database().ref('/monitor/commands');
  $scope.commands = $firebaseArray(itemsRef);
})
.controller('GraphCtrl', function($scope, $stateParams, $firebaseArray, $firebaseObject) {
//	window.ga('send', { hitType: 'pageview', page: "/monitor/graph"});
  $scope.chartObject = {};
  $scope.chartObject.options = {
			'title': '',
			'hAxis':{'formatType' : 'long'}
   };

  $scope.chartObject.data = {
		   "cols": [
			   { id: "t", label: "Date", type: "datetime" },
			   { id: "s", label: "Value", type: "number" }
		   ],
		   "rows": []
	};  
  
  $scope.chartObject.type = "LineChart";
  var itemsRef =  firebase.database().ref('/monitor/commands/'+$stateParams.idCommand);

  itemsRef.once('value', function(snapshot){
	$scope.chartObject.options = {
			'title': snapshot.val().name,
			'hAxis':{'formatType' : 'long'}
	   };

	  
  });
  
  $scope.command = $firebaseObject(itemsRef);

  var dataRef =  firebase.database()
	    .ref('/monitor/database/'+$stateParams.idCommand+'/data').limitToLast(10);

  


  dataRef.on('value', function(snapshot){
      $scope.atualizado = new Date();
			$scope.chartObject.data.rows=[];

	  snapshot.forEach(function(value){

		$scope.chartObject.data.rows.push({c: [
             { v: new Date(value.val().time) },
             { v: value.val().value }
		]});
	  });
	  $scope.$apply();
  });


})
.controller('PreferencesCtrl', function($scope,  $state, $window) {
//	window.ga('send', { hitType: 'pageview', page: "/preferences"});
	var p = {
		'authDomain':$window.localStorage.getItem('authDomain'),
		'databaseURL':$window.localStorage.getItem('databaseURL'),
		'apiKey':$window.localStorage.getItem('apiKey'),
	}

	$scope.p=p;

	$scope.savePreferences=function(p){

		$window.localStorage.setItem('authDomain',angular.copy(p.authDomain));
		$window.localStorage.setItem('databaseURL',angular.copy(p.databaseURL));
		$window.localStorage.setItem('apiKey',angular.copy(p.apiKey));
		//$state.go('app.playlists');
		$scope.p=p;


	}




});
