<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<title>Person Funds</title>
<script>
	$(document).ready(function() {
		$("button").click(function() {
			$.get("/TrainingApp/person", function(data, code) {
				alert("Redirecting to DataBase");
			});
		});
	});
</script>
</head>
<body>
	<h1>Database access</h1>
	<button>GET request for DB</button>
</body>
</html>