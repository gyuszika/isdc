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
		$("#btn1").click(function() {
			$.get("/TrainingApp/person", function(data, status) {
				alert("Data: " + data + "Status: " + status);
			});
		});
	});
</script>

<div id="demo1">
<h1>Get DB</h1>
<button type="button" onclick="loadDoc()">Get DB</button>
</div>


<script>
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo1").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "/TrainingApp/person", true);
  xhttp.send();
}
</script>

<script>
	$(document).ready(function() {
		$("#btn1").click(function() {
			$("#div1").load("/TrainingApp/person");
		});
	});
</script>

<script>
	$(document).ready(function() {
		$("#btn2").click(function() {
			$.post("/TrainingApp/person.do", {
				isin : '1234',
				name : "Donald Duck",
				performance_1yr : '10',
				performance_2yr : '10',
				performance_3yr : '10',
				action : "Add"
			}, function(data, status) {
				alert("Data: " + data + "\nStatus: " + status);
			});
		});
	});
</script>

</head>
<body>
	<div id="div1"><h2>Get/Post methods</h2></div>
	<button id="btn1">GET request</button>
	<button id="btn2">POST request</button>
</body>
</html>