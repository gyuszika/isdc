<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html ng-app="myApp" ng-cloak>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Person Funds</title>
</head>
<link rel="stylesheet" type="text/css" href="/TrainingApp/resources1/css/personStyle.css">
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
<link href="https://gitcdn.github.io/bootstrap-toggle/2.1.0/css/bootstrap-toggle.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">

<body >
<div id="wholeBody" ng-controller="getAllPersonCtrl">
	<p align="right"><b>Time:</b> <span my-current-time="timeFormat"></span>&nbsp;&nbsp;</p>
	<h2>Table Contents</h2>
	 
	 <md-button ng-click="toggleAddNew()" class="md-primary md-raised">Add new person</md-button> 
	 <md-button class="md-primary md-raised" ng-model="persons"  ng-click="toggleHideList()">Get complete list</md-button> 
	
	<div ng-hide="addNewPerson">
		
		<h3>Person Data</h3>
		<div>
			<form name="myForm" id="form" confirm-on-exit>
							
							<label for="isin">Isin</label>
							<span ng-if="myForm.isin.$touched && myForm.isin.$invalid"><font color="red"> is required &</font></span>
							<span ng-if="myForm.isin.$touched && myForm.isin.$invalid"><font color="red"> Should contain 13 numbers!</font></span>
								<div >
									<input class="form-control" style="width: 30%; margin: 0 auto" id="isin" type="text" name="isin" ng-minlength="13" ng-model="isin" maxlength="13" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required/>
								</div>
							<label for="personName">Name</label>
							<span ng-show="myForm.personName.$touched && myForm.personName.$invalid"><font color="red"> is required!</font></span>
								<div>
									<input class="form-control" style="width: 30%; margin: 0 auto" id="personName" type="text" name="personName" ng-model="personName" required/>
								</div>
	
							<div><md-button ng-disabled="myForm.isin.$invalid || myForm.personName.$invalid" class="md-primary md-raised" ng-click="add(); toggleAddNew()" >Add</md-button></div>
					
			</form>
		</div>
	</div>

		<div ng-if="status" id="status">
			<b layout="row" layout-align="center center" class="md-padding">{{status}}</b>
		</div>

		<div><font color="red"><b>{{error}}</b></font></div>

	<div ng-show="personsTable">
		
			<div>
					<h4>Person List</h4> 
					<md-button class="md-primary md-raised" ng-disabled="isEnabled()" ng-click="showDeleteConfirm($event)">Delete</md-button>
					<md-button class="md-primary md-raised" ng-click="toggleHideList()">Hide List</md-button>
					<input class="form-control input-sm" style="width: 25%; margin: 0 auto" placeholder="Search person..." ng-model="searchText">
			</div>
<p></p>
		
		<table name="myTable" ng-model="myTable" class="table table-hover" >
				<thead>
					<tr class="mainTableRow">
						<td>Select All <br><input type="checkbox" ng-model="selectedAll" ng-click="checkAll()" /></td>
						
						<td><b>Isin</b></td>
						
						<td>
							<a href="#" ng-click="sortType = 'personName'; sortReverse = !sortReverse">
							<b>Name</b>
							<span ng-show="sortType == 'personName' && !sortReverse" class="fa fa-caret-down"></span>
           					<span ng-show="sortType == 'personName' && sortReverse" class="fa fa-caret-up"></span>
							</a>
						</td>
						
						<td>
							<a href="#" ng-click="sortType = 'perfTotal'; sortReverse = !sortReverse">
							<b>Total</b>
							<span ng-show="sortType == 'perfTotal' && !sortReverse" class="fa fa-caret-down"></span> 
							<span ng-show="sortType == 'perfTotal' && sortReverse" class="fa fa-caret-up"></span>
							</a>
						</td>
					</tr>
				</thead>
				
			<tbody>
				<tr ng-repeat="person in persons | orderBy: sortType:sortReverse | filter:searchText | unique:'isin'" ng-dblclick="personDetailView.open(person)">
					<td><input type="checkbox" ng-model="person.checked" /></td>
					
					<td><i>{{person.isin}}</td>
					
					<td><span ng-hide="person.editing" ng-dblclick="editItem(person)"><b>{{person.personName}}</b></span>
						<input ng-show="person.editing" ng-model="person.personName" ng-blur="doneEditing(person)" autofocus size="6" />
					</td>
					
					<td ng-model="person.perfTotal">{{person.perfTotal | number : 2}}</td>
				</tr>
			</tbody>
		</table>
		<person-detail model="personDetailView"></person-detail>
		</div>
	</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<!-- <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>  -->
<script src="https://gitcdn.github.io/bootstrap-toggle/2.1.0/js/bootstrap-toggle.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.8/angular-filter.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="/TrainingApp/resources1/javascript/getAllPersonCtrl.js"></script>
</html>