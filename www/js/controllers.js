angular.module('starter.controllers', ['firebase', 'googlechart'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseArray) {


})

.controller('PlaylistsCtrl', function($scope, $stateParams, $firebaseArray) {
  var itemsRef =  firebase.database().ref('/monitor/commands');
  $scope.commands = $firebaseArray(itemsRef);
})
.controller('PlaylistCtrl', function($scope, $stateParams, $firebaseArray, $firebaseObject) {
  var itemsRef =  firebase.database().ref('/monitor/commands/'+$stateParams.idCommand);
  var command = $firebaseObject(itemsRef);

  itemsRef =  firebase.database().ref('/monitor/database/'+$stateParams.idCommand+'/data').limitToLast(50);
  var dados = $firebaseArray(itemsRef);
  $scope.chartObject = {};

  $scope.chartObject.type = "AreaChart";
  var d = [];
  dados.forEach(function(data){
    s.push(
      {
          c: [
             { v: data.time },
             { v: data.value }
          ]
      }

    );
  });

  $scope.chartObject.data = {
       "cols": [
           { id: "t", label: "Date", type: "string" },
           { id: "s", label: "Value", type: "number" }
       ],
       "rows": d
   };

   $scope.chartObject.options = {
       'title': command.name
   };

});
