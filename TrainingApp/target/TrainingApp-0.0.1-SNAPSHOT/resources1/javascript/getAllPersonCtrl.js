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

		$scope.deleteSelected = function() {
		var data = $scope.persons;
		
		for(var i = 0; i < data.length;){
			if (data[i].checked) {
				$scope.persons.splice(data[i],1);
				$http.get("/TrainingApp/delete?isin=" + data[i].isin);
				i=0;
			}
				i++;
			};
		};
		
		
//		angular.forEach(data,function(value, index) 
//		{
//
//			if (value.checked) {
//				$scope.persons.splice(index,1);
//				$http.get("/TrainingApp/delete?isin=" + value.isin);
//			};
//			
//		});
	};
	
	$scope.toggleAll = function() {
	     var toggleStatus = !$scope.isAllSelected;
	     angular.forEach($scope.persons, function(itm){ itm.checked = toggleStatus; });
	   
	  }
	  
	  $scope.optionToggled = function(){
	    $scope.isAllSelected = $scope.persons.every(function(itm){ return itm.checked; })
	  }
	
};
app.controller("getAllPersonCtrl", [ "$scope", "$http", getAllPersonCtrl ]);
