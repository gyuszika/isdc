<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Person Funds</title>
</head>
<body>
	<h1>Person Data</h1>
	<form:form action="person.do" method="POST" commandName="person">
		<table>
			<tr>
				<td>Person ID</td>
				<td><form:input path="pk" /></td>
			</tr>
			<tr>
				<td>Person ISIN</td>
				<td><form:input path="isin" /></td>
			</tr>
			<tr>
				<td>Name</td>
				<td><form:input path="name" /></td>
			</tr>
			<tr>
				<td>Performance Yr1</td>
				<td><form:input path="performance_1yr" /></td>
			</tr>
			<tr>
				<td>Performance Yr2</td>
				<td><form:input path="performance_2yr" /></td>
			</tr>
			<tr>
				<td>Performance Yr3</td>
				<td><form:input path="performance_3yr" /></td>
			</tr>

			<tr>
				<td colspan="2">
				<input type="submit" name="action" value="Add" />
				<input type="submit" name="action" value="Edit" /> 
				<input type="submit" name="action" value="Delete" /> 
				<input type="submit" name="action" value="Search" />
				</td>
			</tr>
		</table>
	</form:form>
			
			<br>
			<table border="1">
				<th>ID</th>
				<th>ISIN</th>
				<th>Name</th>
				<th>Performance Yr1</th>
				<th>Performance Yr2</th>
				<th>Performance Yr3</th>
				<c:forEach items="${personList}" var="person">
					<tr>
						<td>${person.pk}</td>
						<td>${person.isin}</td>
						<td>${person.name}</td>
						<td>${person.performance_1yr}</td>
						<td>${person.performance_2yr}</td>
						<td>${person.performance_3yr}</td>
					</tr>
				</c:forEach>
			</table>
</body>
</html>