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

  var dataRef =  firebase.database().ref('/monitor/database/'+$stateParams.idCommand+'/data').limitToLast(10);


  dataRef.on('value', function(snapshot){
    $scope.atualizado = new Date();
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
			'title': $scope.command.name,
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


})
.controller('PreferencesCtrl', function($scope, $cordovaPreferences) {
  $cordovaPreferences.fetch('authDomain').success(function(value){$scope.authDomain=value}));
  $cordovaPreferences.fetch('databaseURL'.success(function(value){$scope.databaseURL=value}));
  $cordovaPreferences.fetch('apiKey'.success(function(value){$scope.apiKey=value}));


    $scope.store = function(){
        $cordovaPreferences.store('authDomain',$scope.authDomain);
        $cordovaPreferences.store('databaseURL',$scope.databaseURL);
        $cordovaPreferences.store('apiKey',$scope.apiKey);

    }

});
