<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="/TrainingApp/javascript/add.js"></script>
<script src="/TrainingApp/javascript/edit.js"></script>
<script src="/TrainingApp/javascript/search.js"></script>
<script src="/TrainingApp/javascript/delete.js"></script>
<script src="/TrainingApp/javascript/getContent.js"></script>
<script src="/TrainingApp/javascript/calculate.js"></script>

<title>Person Funds</title>

	<style>
	table#content {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 50%;
	}
	
	td, th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 3px;
	}
	
	tr:nth-child(even) {
		background-color: #dddddd;
		text-align: center;
	}

</style>
	</head>
<body>
	<h1>Person Data</h1>
	<form id="form">
		<table>
			<tr>
				<td>Person ID</td>
				<td><input type="text" name="id" value="" /></td>
			</tr>
			<tr>
				<td>Person ISIN</td>
				<td><input type="text" name="isin" value="" /></td>
			</tr>
			<tr>
				<td>Name</td>
				<td><input type="text" name="name" value="" /></td>
			</tr>
			<tr>
				<td>Performance Yr1</td>
				<td><input type="text" name="performance_1yr" value="" /></td>
			</tr>
			<tr>
				<td>Performance Yr2</td>
				<td><input type="text" name="performance_2yr" value="" /></td>
			</tr>
			<tr>
				<td>Performance Yr3</td>
				<td><input type="text" name="performance_3yr" value="" /></td>
			</tr>

			<tr>
				<td colspan="2">
					<button id="btn_add" type="submit" name="add">Add</button>
					<button id="btn_edit" type="button" name="edit">Edit</button>
					<button id="btn_search" type="button" name="search">Search</button>
					<button id="btn_delete" type="button" name="delete">Delete</button>
				</td>
			</tr>
		</table>
	</form>
	<br>

	<h2>Table Contents</h2>
	
	<button id="btn_getPerson" type="button" name="getPerson">Get Person</button>
	<button id="btn_getAllPerson" type="button" name="getAllPerson">Get All</button>


	<table id="content">
			<tr>
				<th>ISIN</th>
				<th>Name</th>
				<th>Performannce 1st Year</th>
				<th>Performannce 2nd Year</th>
				<th>Performannce 3rd Year</th>
			</tr>
			<tr>
				<td id="isin"></td>
				<td id="name"></td>
				<td id="performance1"></td>
				<td id="performance2"></td>
				<td id="performance3"></td>
			</tr>
	</table>


</body>
</html>