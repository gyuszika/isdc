var app = angular.module("myApp", []);
var getAllPersonCtrl = function($scope, $http) {

	var onUserComplete = function(response) {
		$scope.persons = response.data;
	};
	
	var result=function(person){
		$scope.persons.push(person.data);
	};
	
	var onError = function(reason) {
		$scope.error = "Couldn't complete request";
	};

	$scope.getAll = function() {
		$http.get("/TrainingApp/getAllPerson").then(onUserComplete, onError);
	};
	
	$scope.add = function() {

		var person = $.param({
			isin : $scope.isin,
			name : $scope.name,
			performance_1yr : $scope.performance_1yr,
			performance_2yr : $scope.performance_2yr,
			performance_3yr : $scope.performance_3yr
		});
		
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
        };
		$http.post("/TrainingApp/add", person, config)
	
	};
	
	$scope.checkboxModel = {
		       value2 : 'YES'
		     };

};
app.controller("getAllPersonCtrl", [ "$scope", "$http", getAllPersonCtrl ]);
