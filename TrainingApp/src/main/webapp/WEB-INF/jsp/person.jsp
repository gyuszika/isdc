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
<div id="wholeBody" ng-controller="getAllPersonCtrl" class="non-printable" >
	
	<p align="right"><b>Time:</b> <span my-current-time="timeFormat"></span>&nbsp;&nbsp;</p>
	<h2>Table Contents</h2>
	 
	 <button class="btn btn-success" ng-click="toggleAddNew()" class="md-primary md-raised">Add person <span class="glyphicon glyphicon-plus"></span></button> 
	
				<button class="btn btn-info" ng-model="persons"  ng-click="toggleHideList()" ng-if="!myTable"> <span class="glyphicon glyphicon-eye-open"></span> Toggle Table</button> 
<br>
<br>
	
	<div ng-hide="addNewPerson">
		
			<form name="myForm" id="form" confirm-on-exit>
						<div class="new-person" >
							
							<label for="personName">Name</label><br>
								<md-input-container >
									<label>Full name</label> <input required="" ng-model="personName" name="personName" />
									<div ng-messages="myForm.personName.$error">
										<div ng-message="required">This is required.</div>
									</div>
								</md-input-container>
<br>
								<label for="isin">Isin <span><font size="3" color="red">{{genderNumber}}{{birthdate}}{{uniqueNumber}}</font></span></label>
									<div layout-gt-xs="row" layout-align="center start">
										<md-input-container style="margin-right: 5px; width: 100px;">
											<label>Gender</label> 
												<md-select ng-model="gender"> 
													<md-option name="genderSelection" ng-repeat="gender in genders" value="{{gender.abbrev}}" ng-click="changeToNumber(gender)">{{gender.abbrev}} </md-option> 
												 </md-select> 
										</md-input-container>
				
											<div flex-gt-xs="">
												<md-input-container style="margin-right: 5px;">
														<md-datepicker ng-change="doDateTransformation()" name="date" ng-model="myDate" md-current-view="year" md-placeholder="Birth date" md-min-date="minDate" md-max-date="maxDate" required=""></md-datepicker>
												</md-input-container>
											</div>
									
										<md-input-container style=" width: 140px;">
											<label>Unique nr.</label> 
												<input name="uniqueNumber" ng-model="uniqueNumber" placeholder="123456" required="" ng-pattern="/^[0-9]{6}$/" md-maxlength="6" > 
										</md-input-container>
									</div>
							</div>	
					<div><md-button ng-disabled="myForm.date.$invalid || myForm.genderSelection.$invalid || myForm.uniqueNumber.$invalid || myForm.personName.$invalid" class="md-primary md-raised" ng-click="add(); toggleAddNew()" >Add <span class="glyphicon glyphicon-ok-sign"></span></md-button></div>
				</form>
	</div>

		<div ng-if="status" id="status">
			<b layout="row" layout-align="center center" class="md-padding">{{status}}</b>
		</div>

		<div><font color="red"><b>{{error}}</b></font></div>

	<div ng-controller="ModalDemoCtrl " class="modal-demo" ng-show="personsTable">
		
			<div class="person-handle">
				<button class="btn btn-danger" ng-disabled="isEnabled()" ng-click="showDeleteConfirm($event)">Delete <span class="glyphicon glyphicon-remove"></span></button>
					<md-input-container >
						<label>Search person...</label> <input ng-model="searchText" />
					</md-input-container>
			</div>
<p></p>
	
		<table name="myTable" ng-model="myTable" class="table table-hover" ng-hide="myTable">

				<thead uib-tooltip="*double-click on row to view performances"
		           	   tooltip-placement="top-right"
		               tooltip-trigger="'mouseenter'">
					<tr class="mainTableRow" >
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
							</a><br>
							<a href="#">
         					 <span class="glyphicon glyphicon-refresh" ng-click="getAll()"></span>
       						</a>
						</td>
					</tr>
				</thead>
			<tbody>
				<tr ng-repeat="person in persons | orderBy: sortType:sortReverse | filter:searchText | unique:'isin'" ng-dblclick="open(person, $event)">
					<td><input type="checkbox" ng-model="person.checked" data-is-name="true"/></td>
					<td><i>{{person.isin}}</td>
					<td><span ng-hide="person.editing" ng-dblclick="editItem(person)">
					<b data-is-name="true"
					   uib-tooltip="*double-click to edit"
		           	   tooltip-placement="top"
		               tooltip-trigger="'mouseenter'">{{person.personName}}</b></span>
						<input ng-show="person.editing" ng-model="person.personName" ng-blur="doneEditing(person)" autofocus size="6" />
					</td>
					<td ng-model="person.perfTotal">{{person.perfTotal | number : 2}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://gitcdn.github.io/bootstrap-toggle/2.1.0/js/bootstrap-toggle.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-2.4.0.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.8/angular-filter.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="/TrainingApp/resources1/javascript/getAllPersonCtrl.js"></script>
</html>