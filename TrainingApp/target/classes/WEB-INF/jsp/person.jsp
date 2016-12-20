<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="/TrainingApp/javascript/add.js"></script>
<script src="/TrainingApp/javascript/edit.js"></script>
<script src="/TrainingApp/javascript/delete.js"></script>
<script src="/TrainingApp/javascript/getContent.js"></script>
<script src="/TrainingApp/javascript/editable.js"></script>
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.min.js"></script>
<title>Person Funds</title>

	<style>
	table#myTable {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		font-family: arial, sans-serif;
	}
	
	tr {
		border: 1px;
		text-align: left;
		padding: 3px;
	}
	
	th {
		border: 1px;
		text-align: left;
		padding: 3px;
	}
	</style>
	
</head>

<body>
	
	<h1>Person Data</h1>
	<form id="form" >
		<table id ="register">
			<tr>
				<td>Person ID</td>
				<td><input type="text" name="pk" /></td>
			</tr>
			<tr>
				<td>Person ISIN</td>
				<td><input type="text" name="isin" maxlength="13" onkeypress='return event.charCode >= 48 && event.charCode <= 57' /></td>
			</tr>
			<tr>
				<td>Name</td>
				<td><input type="text" name="name" /></td>
			</tr>
			<tr>
				<td>Performance Yr1</td>
				<td><input type="number" name="performance_1yr" step="any" /></td>
			</tr>
			<tr>
				<td>Performance Yr2</td>
				<td><input type="number" name="performance_2yr" step="any" /></td>
			</tr>
			<tr>
				<td>Performance Yr3</td>
				<td><input type="number" name="performance_3yr" step="any" /></td>
			</tr>

			<tr>
				<td colspan="2">
					<button id="btn_add" type="submit" name="add">Add</button>
					<button id="btn_edit" type="submit" name="edit">Edit</button>
				</td>
			</tr>
		</table>
	</form>
	
	<br>

	<h2>Table Contents</h2>
	<form id="form">Search ISIN <input id="isin" type="text" name="isin" style="width: 130px;"/> </form>
	<button id="btn_getPerson" type="button" name="getPerson">Get Person</button>
	
	 
<div class="tableContent">
	<br>
	<div>
	Search Person
	<input type="text" placeholder="Search..." id="search_field" ><button id="btn_getAllPerson" type="button" name="getAllPerson" >Get All</button>
	</div>
	<br>
	
	<table id="myTable" border="1px">
	
	<caption><b>Person List</b></caption>
	<button id="clear_all" type="button" name="clearAll">Clear List</button>
		 <tr>
		 	<th class="empty"></th>
	 		<th>ISIN</th>
			<th>Name</th>
			<th>Performance 1st Year</th>
			<th>Performance 2nd Year</th>
			<th>Performance 3rd Year</th>
			<th>Total</th>
			<th class="empty"></th>
		</tr>	
	
	 <tbody id="myTbody"> </tbody>

	</table>

</div>

</body>
</html>