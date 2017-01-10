var app = angular.module("myApp", ['ngRoute','ngMaterial', 'ngMessages']).
config(function($anchorScrollProvider) {
  	
    $anchorScrollProvider.disableAutoScrolling();
  });

var getAllPersonCtrl = function($scope, $http, $mdDialog) {
	
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
	
	$scope.isinPattern='[12]\\d{13}';
	//funtion for adding new person
	$scope.add = function() {
		
		//created variable to be parsed to controller as a string
		var person = $.param({
			isin : $scope.isin,
			name : $scope.name,
			performance_1yr : $scope.performance_1yr,
			performance_2yr : $scope.performance_2yr,
			performance_3yr : $scope.performance_3yr
		});
		
		//current variable creates the Object
		var personToAdd = {
			isin : $scope.isin,
			name : $scope.name,
			performance_1yr : $scope.performance_1yr,
			performance_2yr : $scope.performance_2yr,
			performance_3yr : $scope.performance_3yr
		};
		
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
        };
		$http.post("/TrainingApp/add", person, config)
		$scope.persons.push(personToAdd);
		
		//on click (Add) button it hides input form
		$scope.addNewPerson = false;
        $scope.toggleAddNew = function() {
        $scope.addNewPerson = $scope.addNewPerson === false ? true: false;
        
         //on click empties inputs from form
		 $scope.isin = null;
		 $scope.name = null;
		 $scope.performance_1yr = null;
		 $scope.performance_2yr = null;
		 $scope.performance_3yr = null;
        };
        
	};
		
		  //select/unselect all rows from table
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
	        
	        //Confirmation box before deleting
	        $scope.showConfirm = function(ev) {
	           
	            var confirm = $mdDialog.confirm()
	                  .title('Are you sure you want to delete selected item/s?')
	                  .textContent('These data will be lost forever.')
	                  .ariaLabel('Lucky day')
	                  .targetEvent(ev)
	                  .ok('Delete')
	                  .cancel('Cancel');

	            $mdDialog.show(confirm).then(deleteSelected,function() {
	            });
	          };
	        
	       
	          //Enables DELETE button if checkbox(any) is selected  
	        $scope.isEnabled=function(){
	      		var isEnabled=false;
	      		
	      		 angular.forEach($scope.persons, function (person) {
	      			 isEnabled=isEnabled || person.checked;
	      	        });
	      		 return !isEnabled;
	      	};

          	//delete selected row/rows
	        var deleteSelected = function() {
      		var data = $scope.persons;
      		var selectedObject = [];
      		
      		//iterates list and deletes selected objects, dynamically replaces list with remaining Objects
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
	          
	          function DialogController($scope, $mdDialog) {
	        	    $scope.hide = function() {
	        	      $mdDialog.hide();
	        	    };

	        	    $scope.cancel = function() {
	        	      $mdDialog.cancel();
	        	    };

	        	    $scope.answer = function(answer) {
	        	      $mdDialog.hide(answer);
	        	    };
	        	  }
	
};
app.controller("getAllPersonCtrl", [ "$scope", "$http","$mdDialog","$anchorScroll",  getAllPersonCtrl ]);
	
