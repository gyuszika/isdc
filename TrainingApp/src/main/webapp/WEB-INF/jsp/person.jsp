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
<script src="/TrainingApp/javascript/calculate.js"></script>

<title>Person Funds</title>
</head>
<body>
	<h1>Person Data</h1>
	<form id="form">
	<table>
		<tr>
			<td>Person ID</td>
			<td><input type="text" name="pk" /></td>
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
				<button id="btn_add" type="submit" name="add" >Add</button>
				<button id="btn_edit" type="submit" name="edit" >Edit</button>
				<button id="btn_search" type="button" name="search" >Search</button>
				<button id="btn_delete" type="submit" name="delete" >Delete</button>
			</td>
		</tr>
	</table>
</form>

	<br>
	<table border="1">
		<th>ID</th>
		<th>ISIN</th>
		<th>Name</th>
		<th>Performance Yr1</th>
		<th>Performance Yr2</th>
		<th>Performance Yr3</th>
		<th>Total performance</th>
		<c:forEach items="${personList}" var="person">
			<tr>
				<td>${person.pk}</td>
				<td>${person.isin}</td>
				<td>${person.name}</td>
				<td>${person.performance_1yr}</td>
				<td>${person.performance_2yr}</td>
				<td>${person.performance_3yr}</td>
				<td><p id="demo">Hidden</p></td>
				<td><button type="button" onclick="myFunction()">Calculate
						total</button></td>


			</tr>
		</c:forEach>
	</table>

</body>
</html>