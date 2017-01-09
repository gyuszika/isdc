var app = angular.module("myApp", ['ngMaterial']);

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

	//retrieves complete list fro mdatabase
	$scope.getAll = function() {
		$http.get("/TrainingApp/getAllPerson").then(onUserComplete, onError);
	};
	
	//funtion for adding new person
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
		
		//on click (Add) button it hides data input form
		$scope.addNewPerson = true;
        $scope.toggleAddNew = function() {
         $scope.addNewPerson = $scope.addNewPerson === false ? true: false;
        };
	
	};
		
		//delete selected row/rows
		$scope.deleteSelected = function() {
		var data = $scope.persons;
		var selectedObject=[];
		
		angular.forEach(data, function(value, index) {
			if (!value.checked) {
				selectedObject.push(value);
			} else {
				$http.get("/TrainingApp/delete?isin=" + value.isin);
			}
			;
		});
			$scope.persons = selectedObject;
		};
	
		  //select/unselect all table rows
		  $scope.checkAll = function () {
		        if ($scope.selectedAll) {
		            $scope.selectedAll = true;
		        } else {
		            $scope.selectedAll = false;
		        }
		        angular.forEach($scope.persons, function (person) {
		            person.checked = $scope.selectedAll;
		        });

		    };
		    
		    //toggle between show/hide input form for adding a new person
		    $scope.addNewPerson = true;
	        $scope.toggleAddNew = function() {
	        $scope.addNewPerson = $scope.addNewPerson === false ? true: false;
	        };
	     
	        //toggle between show/hide table
	        $scope.personsTable = true;
	        $scope.toggleHideList = function() {
	        $scope.personsTable = $scope.personsTable === false ? true: false;
	        };
	
};
app.controller("getAllPersonCtrl", [ "$scope", "$http", getAllPersonCtrl ]);
