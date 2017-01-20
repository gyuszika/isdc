var app = angular.module("myApp", ['ngRoute','ngMaterial', 'ngMessages', 'angular.filter'])

var getAllPersonCtrl = function($scope, $http, $mdDialog) {

	$scope.timeFormat = 'MM/d/yyyy h:mm:ss a';
	
	var initial = {text: 'initial value'};
    $scope.myModel = angular.copy(initial);
    $scope.revert = function() {
        $scope.isin = angular.copy(initial);
        $scope.myForm.$setPristine();
    }
	
	var onUserComplete = function(response) {
		$scope.persons = response.data;
		
		angular.forEach($scope.persons, function(person) {
			person.perfTotal = 0;
			for (var int = 0; int < person.performance.length; int++) {
				person.perfTotal += person.performance[int].performance;
			}
		})
	};
	
	var result=function(person){
		$scope.persons.push(person.data);
	};
	
	var onError = function(reason) {
		$scope.error = "Couldn't complete request";
	};

	//retrieves complete list from database
	$scope.getAll = function() {
		$http.get("/TrainingApp/getAllPerson").then(onUserComplete, onError);
	};
	
	//function for adding new person
	$scope.add = function() {
		
		//created variable to be parsed to controller as a string
		var person = $.param({
			isin : $scope.isin,
			personName : $scope.personName
		});
		
		//current variable creates the Object
		var personToAdd = {
			isin : $scope.isin,
			personName : $scope.personName
		};
		
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
        };
		$http.post("/TrainingApp/add", person, config);
		
		//on click empties inputs from form
		 $scope.isin = null;
		 $scope.personName = null;
		
		 $scope.myForm.$setUntouched();
		
		 $scope.persons.push(personToAdd);
		
		//on click (Add) button it hides input form
		$scope.addNewPerson = false;
        $scope.toggleAddNew = function() {
        $scope.addNewPerson = $scope.addNewPerson === false ? true: false;
        
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
	        $scope.toggleHideList = function () {
	        	$scope.personsTable = !$scope.personsTable;
	        };

	        
	        //Confirmation box before deleting
	        $scope.showDeleteConfirm = function(ev) {
	           
	            var confirm = $mdDialog.confirm()
	                  .title('Are you sure you want to delete selected item/s?')
	                  .textContent('These data will be lost forever.')
	                  .ariaLabel('Lucky day')
	                  .targetEvent(ev)
	                  .ok('Delete')
	                  .cancel('Cancel');

	            $mdDialog.show(confirm).then(deleteSelected);
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
      		var uniqueData = {};
      		var selectedObject = [];
      		
      	for(var i = 0; i< data.length; i++){
      		var currentIsin = data[i].isin;
      		if (uniqueData[currentIsin]) {
      			uniqueData[currentIsin].performance.push(data[i].performance);
      			continue;
      		}
      		uniqueData[currentIsin] = data[i];
      		uniqueData[currentIsin].performanceArray = [data[i].performance];
      	}

      		
      		//iterates list and deletes selected objects, dynamically replaces list with remaining Objects
      		angular.forEach(uniqueData, function(value, index) {
      			if (!value.checked) {
      				selectedObject.push(value);
      			} else {
      				$http.get("/TrainingApp/delete?isin=" + value.isin);
      			}
      			;
      		});
      			uniqueData = selectedObject;
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

	          
	          $scope.editItem = function (person) {
	        	  person.editing = true;
	          }

	          $scope.doneEditing = function (person) {
	        	  person.editing = false;
	        	 
	        	  var personToEdit = $.param({
	      			isin : person.isin,
	      			personName : person.personName,
	      		});
	      		
	      		var config = {
	                      headers : {
	                          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	                      }
	              };
	      		$http.post("/TrainingApp/edit", personToEdit, config);
	
	          };
	          
	          $scope.getAll();
};

app.controller("getAllPersonCtrl", [ "$scope", "$http","$mdDialog","$anchorScroll", getAllPersonCtrl])

.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

    function link(scope, element, attrs) {
    	
    	var timeFormat, timeoutId;

      function updateTime() {
        element.text(dateFilter(new Date(), timeFormat));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        timeFormat = value;
        updateTime();
      });

      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM
      }, 1000);
    }

    return {
      link: link
    };
  }])
 .directive('confirmOnExit', function() {
        return {
            link: function($scope, elem, attrs) {
                window.onbeforeunload = function(){
                    if ($scope.myForm.$dirty) {
                        return "The form is dirty, do you want to stay on the page?";
                    }
                }
                $scope.$on('$locationChangeStart', function(event, next, current) {
                    if ($scope.myForm.$dirty) {
                        if(!confirm("The form is dirty, do you want to stay on the page?")) {
                            event.preventDefault();
                        }
                    }
                });
            }
        };
    })

.config(function($anchorScrollProvider) {
  	
    $anchorScrollProvider.disableAutoScrolling();
  });
  
  