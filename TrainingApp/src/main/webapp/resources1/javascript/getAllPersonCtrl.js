var app = angular.module("myApp", ['ngRoute','ngMaterial', 'ngMessages', 'angular.filter', 'ui.bootstrap'])

var getAllPersonCtrl = function($scope, $http, $mdDialog) {

	//min and max dates for date picker
	 var myDate = new Date(99,1,1);

	  $scope.minDate = new Date(
	    myDate.getFullYear()-50,
	    myDate.getMonth(),
	    myDate.getDate()
	  );

	  $scope.maxDate = new Date(
		myDate.getFullYear(),
		myDate.getMonth(),
	   	myDate.getDate()
	  );
	
	  //transform and parse date to isin model to validate form
	  $scope.myDate;
	 
	  $scope.$watch("myDate", function(newValue, oldValue) {
		  if(newValue) {
			   var year= newValue.getFullYear().toString().substr(2,4);
			   var month = newValue.getMonth()+1;
			   var day = newValue.getDate();
			   
			  
			   var newDay;
			   if(day < 10){
				 newDay="0"+day.toString();  
				   }else{
					   newDay=day.toString();
				   };
			   
			   var newMonth;
			   if(month < 10){
				   newMonth="0"+month.toString();  
				   }else{
					   newMonth=month.toString();
				   };
			
				var isinYear = year+newMonth+newDay;
			   
			   $scope.birthdate = isinYear;
		  }
		});
	
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
	
	$scope.genders = ('Male Female').split(' ').map(function(gender) {
        return {abbrev: gender};
    
	});
	
	//changes Gender to a number value so that ISIN will store only digits
	$scope.changeToNumber = function(gender){
//       var gender = $scope.gender.abbrev;
		if(gender.abbrev === "Male"){
        	$scope.genderNumber = 1;
        }else{
        $scope.genderNumber = 2;
        }
	};
	
	//function for adding new person
	$scope.add = function() {
		var completeIsin = $scope.genderNumber.toString() + $scope.birthdate + $scope.uniqueNumber;
		
		//created variable to be parsed to controller as a string
		var person = $.param({
			isin : completeIsin,
			personName : $scope.personName
		});
		
		//current variable creates the Object
		var personToAdd = {
			isin : completeIsin,
			personName : $scope.personName
		};
		
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
        };
		$http.post("/TrainingApp/add", person, config);
		
		
			//on click empties inputs from form
			$scope.genderNumber = null;
			$scope.birthdate = null;
			$scope.uniqueNumber = null;
			$scope.gender = null;
			$scope.uniqueNumber = null;
			$scope.myDate=null;
			$scope.personName = null;
			$scope.myForm.$setUntouched();
			
			$scope.persons.push(personToAdd);
		
			//on click (Add) button it hides input form
			$scope.addNewPerson = false;
	       
			$scope.toggleAddNew = function() {
				$scope.addNewPerson = $scope.addNewPerson === false ? true: false;
	        };
        
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
      	   

	// Edit person name on double-click
	$scope.editItem = function(person) {
		person.editing = true;
	}

	$scope.doneEditing = function(person) {
		person.editing = false;

		var personToEdit = $.param({
			isin : person.isin,
			personName : person.personName,
		});

		var config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post("/TrainingApp/edit", personToEdit, config);

	};
	          
};

app.controller("getAllPersonCtrl", ["$scope", "$http", "$mdDialog", "$anchorScroll", getAllPersonCtrl])

// following directive shows live date/time on front page
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

//following directive, opens alert box if form is left dirty and there are unsaved datas
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

.config(function($anchorScrollProvider, $mdAriaProvider) {
  	
    $anchorScrollProvider.disableAutoScrolling();
    $mdAriaProvider.disableWarnings();
  })
 
  //Following controller is a modal for person detailed information regarding it's performance
.controller('ModalDemoCtrl', function ($scope, $uibModal, $http, $log, $document) {
  
	 $scope.getAll();
	 $scope.data = $scope.persons;
	 $scope.animationsEnabled = true;

	 $scope.open = function(person, $event) {
		 
		 if($($event.target).data('isName')) {
			 return;
		 }
		 
		var modalInstance = $uibModal.open({
			animation : $scope.animationsEnabled,
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			templateUrl : '/TrainingApp/resources1/html/personDetail.html',
			controller : 'ModalInstanceCtrl',
			size : 'lg',
			resolve : {
				data : function() {
					return person;
				}
			}
		});
		
	};

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
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
  
})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $filter, data) {
  $scope.person = data;
 
  $scope.panel = {};
  
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
  //defines person's gender based on 1st digit from ISIN
  var genderNumber = (data.isin.toString().charAt(0));
  if (genderNumber == 1){
		$scope.gender = "Male";
		$scope.image = "/TrainingApp/resources1/images/male.png";
	}else{
		$scope.gender = "Female";
		$scope.image = '/TrainingApp/resources1/images/female.png';
	};
	
	//defines persons's birthdate based on substr. of isin
	 var personBirthYear = (data.isin.toString().substring(1,3));
	 var personBirthMonth = (data.isin.toString().substring(3,5));
	 var personBirthDay = (data.isin.toString().substring(5,7));
	 
	 $scope.birthDate = personBirthMonth +"."+ personBirthDay +"."+ personBirthYear;
  
  //Following function changes modal table to chart view
  $scope.showPanel = function(x) {
	  
	  if($scope.panel[x] !== undefined) {
		  $scope.panel[x] = !$scope.panel[x];
		  return;
	  }
	  
 	 $scope.panel[x] = true;
 	 
	 if(x =='pie') {
    	instantiatePie();
	} else if(x =='chart'){
		instantiateChart();
	}
	 
  };
  
  function instantiateChart() {
	  var chartData = {};
	 	 chartData.performanceYears = [];
	 	 chartData.performances= [];
	 	 chartData.personToCheck = $filter('orderBy')($scope.person.performance, 'performanceYear');

		  angular.forEach(chartData.personToCheck, function(value, key){
		 	 chartData.performanceYears.push(value.performanceYear+'');
		 	 chartData.performances.push(value.performance); 
		  });
  
     	Highcharts.chart('performance-chart', {
            title: {
              text: 'Performance Chart'
            },

            xAxis: {
              categories: chartData.performanceYears
            },

            series: [{
              data: chartData.performances
            }]
          });
  }
  

  function instantiatePie() {
	  
	  var pieData = {};
	 	pieData.bestPerformances = [];
	 	pieData.worstPerformances = [];
	 	pieData.averagePerformances = [];
	 	pieData.personToCheck = $filter('orderBy')($scope.person.performance, 'performanceYear');
	 	
	 	angular.forEach(pieData.personToCheck, function(value, key){
	 		if(value.performance > 600){
		  		 pieData.bestPerformances.push(value.performanceYear);
		  	 }else if(value.performance < 600 && value.performance > 200){
		  		 pieData.averagePerformances.push(value.performanceYear);
		  	 }else{
		  		 pieData.worstPerformances.push(value.performanceYear);
		  	 }
  	 
   });
	 	
	 	pieData.average = (pieData.averagePerformances.length/17)*100;
	 	pieData.best = (pieData.bestPerformances.length/17)*100;
	 	pieData.worst = (pieData.worstPerformances.length/17)*100;
	  
	 	// Pie Chart
	    Highcharts.chart('performance-pie', {
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Performance Pie'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    },
	                    connectorColor: 'silver'
	                }
	            }
	        },
	        series: [{
	            name: 'Rate',
	            data: [
	                { name: 'Average', y: pieData.average,
	                    sliced: true,
	                    selected: true 
	                  },
	                {name: 'Bad > 200$',  y: pieData.worst},
	                { name: 'Good > 600$', y: pieData.best }
	            ]
	        }]
	    });
	    
	 }
  });
