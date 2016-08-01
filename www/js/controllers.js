angular.module('starter.controllers', ['firebase', 'googlechart'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseArray) {


})

.controller('PlaylistsCtrl', function($scope, $stateParams, $firebaseArray) {
  var itemsRef =  firebase.database().ref('/monitor/commands');
  $scope.commands = $firebaseArray(itemsRef);
})
.controller('PlaylistCtrl', function($scope, $stateParams, $firebaseArray, $firebaseObject) {
  var itemsRef =  firebase.database().ref('/monitor/commands/'+$stateParams.idCommand);
  
  
  $scope.command = $firebaseObject(itemsRef);

  var dataRef =  firebase.database().ref('/monitor/database/'+$stateParams.idCommand+'/data').limitToLast(50);


  dataRef.on('value', function(snapshot){
	  var d = [];
	  snapshot.forEach(function(value){
			
			d.push({c: [
             { v: new Date(value.val().time) },
             { v: value.val().value }
			]});		  
	  });
	  $scope.chartObject = {};
	  $scope.chartObject.type = "LineChart";
	   $scope.chartObject.options = {
			'title': 'teste',
			'hAxis':{'formatType' : 'long'}
		};
	  	  
	  $scope.chartObject.data = {
		   "cols": [
			   { id: "t", label: "Date", type: "datetime" },
			   { id: "s", label: "Value", type: "number" }
		   ],
		   "rows": d
	   };

  });


});
