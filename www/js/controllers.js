angular.module('starter.controllers', ['firebase', 'googlechart', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseArray) {


})

.controller('PlaylistsCtrl', function($scope, $stateParams, $firebaseArray) {
  var itemsRef =  firebase.database().ref('/monitor/commands');
  $scope.commands = $firebaseArray(itemsRef);
})
.controller('PlaylistCtrl', function($scope, $stateParams, $firebaseArray, $firebaseObject) {
  var itemsRef =  firebase.database().ref('/monitor/commands/'+$stateParams.idCommand);


  $scope.command = $firebaseObject(itemsRef);

  var dataRef =  firebase.database().ref('/monitor/database/'+$stateParams.idCommand+'/data').limitToLast(10);
  $scope.chartObject = {};
  $scope.d = [];
  $scope.chartObject.type = "LineChart";
  $scope.chartObject.options = {
		'title': $scope.command.name,
		'hAxis':{'formatType' : 'long'}
   };

    $scope.chartObject.data = {
		   "cols": [
			   { id: "t", label: "Date", type: "datetime" },
			   { id: "s", label: "Value", type: "number" }
		   ],
		   "rows": []
	};	   
   
  dataRef.on('value', function(snapshot){
      $scope.atualizado = new Date();
	  console.log(new Date()+"atualizacao");
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
