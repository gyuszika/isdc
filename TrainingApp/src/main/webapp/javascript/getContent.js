$(document).ready(function() {
	function getPerson() {
		var ajaxRequest;

		try {

			ajaxRequest = new XMLHttpRequest();
		} catch (e) {

			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {

					alert("Your browser broke!");
					return false;
				}
			}
		}
	}

	$("#btn_getPerson").click(function() {

		var id = $("#id").val();

		$.ajax({
			url : "/TrainingApp/getPerson",
			method : "GET",
			data : {
				"id": id
			},
			success : function(data, status, xhr) {
				console.log(data);
				$("#status_text").html(data);
				$('#isin').val();
				$('#name').val('');
				$('#Performance Year1').val(data.performance_1yr);
				$('#Performance Year2').val('');
				$('#Performance Year3').val('');
				
				$("#isin").append("<tr><td>"+data.isin+"</td></tr>");
				$("#name").append("<tr><td>"+data.name+"</td></tr>");
				$("#performance1").append("<tr><td>"+data.performance_1yr+"</td></tr>");
				$("#performance2").append("<tr><td>"+data.performance_2yr+"</td></tr>");
				$("#performance3").append("<tr><td>"+data.performance_3yr+"</td></tr>");

			}

		});
	});
});