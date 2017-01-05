<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- <html> -->
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Person Funds</title>
</head>
<link rel="stylesheet" type="text/css" href="/TrainingApp/resources1/css/personStyle.css">
<body >

<div id="wholeBody" ng-controller="getAllPersonCtrl">
<!-- <div id="wholeBody" > -->
	<h2>Person Data</h2>
	
	<form name="myForm" id="form" ng-submit="add()">
	
			<table id="register">
					
					<tr><td>ISIN<span ng-show="myForm.isin.$touched && myForm.isin.$invalid"><font color="red">is required!</font></span>
					<span ng-if="myForm.isin.$touched && myForm.isin.$invalid"><font color="red"> Should contain 13 numbers</font></span>
					<input type="text" name="isin" ng-minlength="13" ng-model="isin" maxlength="13" onkeypress='return event.charCode >= 48 && event.charCode <= 57'required/></td></tr>
					
					<tr><td>Name<span ng-show="myForm.name.$touched && myForm.name.$invalid"><font color="red"> is required!</font></span><input type="text" name="name" ng-model="name" required/></td></tr>
					<tr><td>Performance Year1<input type="number" name="performance_1yr" ng-model="performance_1yr" step="any" /></td></tr>
					<tr><td>Performance Year2<input type="number" name="performance_2yr" ng-model="performance_2yr" step="any" /></td></tr>
					<tr><td>Performance Year3<input type="number" name="performance_3yr" ng-model="performance_3yr" step="any" /></td></tr>
					<tr ng-if="myForm.isin.$touched && myForm.isin.$valid && myForm.name.$valid"><td><input type="submit" value="Add"/></td></tr>
			</table>
	</form>
	
	<div><font color="red"><b>{{error}}</b></font></div>
	
	<div >
		<h2>Table Contents</h2>
				<input type="submit" ng-model="persons" value="Get all" ng-click="getAll()" > 
		
			<div ng-show="persons">
					<h2>Person List</h2> 
					
					Select All<input type="checkbox" ng-model="selectedAll" ng-click="checkAll()" />
					<button ng-click="persons=[]">Clear List</button>
					<input placeholder="Search person..." ng-model="searchText"> &nbsp &nbsp &nbsp
					
						Order:
						<select ng-model="tableSort">
							<option value="+name">Name A-Z</option>
							<option value="-name">Name Z-A</option>
							<option value="-total">Total &uarr;</option>
							<option value="+total">Total &darr;</option>
						</select>
			</div>
		

		<table id="myTable" ng-model="myTable" ng-show="persons" >
				<thead >
					<tr class="mainTableRow">
						<th></th>
						<th><button ng-click="deleteSelected()">Delete</button></th>
						<th>Isin</th>
						<th>Name</th>
						<th>Perf-1st Year</th>
						<th>Perf-2nd Year</th>
						<th>Perf-3rd Year</th>
						<th>Total</th>
					</tr>
				</thead>
				
			<tbody>
				<tr ng-repeat="person in persons | orderBy: tableSort | filter:searchText">
					<td></td>
					<td><input type="checkbox" ng-model="person.checked" /></td>
					<td><i>{{person.isin}}</td>
					<td><b>{{person.name}}</b></td>
					<td>{{person.performance_1yr | number}}</td>
					<td>{{person.performance_2yr | number}}</td>
					<td>{{person.performance_3yr | number}}</td>
					<td ng-init="person.total = person.performance_1yr + person.performance_2yr + person.performance_3yr"><b>{{person.total | number}}</b></td>
				</tr>
			</tbody>
		</table>
			
		</div>
</body>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script data-require="angular.js@1.6.0" data-semver="1.6.0" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="/TrainingApp/resources1/javascript/getAllPersonCtrl.js"></script>
<script src="/TrainingApp/resources1/javascript/edit.js"></script>
<script src="/TrainingApp/resources1/javascript/delete.js"></script>
<script src="/TrainingApp/resources1/javascript/editable.js"></script>

</html>