$(document).ready(function(){

	function add() {
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

	$("#btn_add").click(function(e)  {
		e.preventDefault();
		
		var formData = $("#form").serialize();
		
$("#demo").text($('form').serialize());

		$.ajax({
			url : "/TrainingApp/add",
			method : "POST",
			data : formData,
			success : function(data, status, xhr) {
				$("#status_text").html(data);
				$('#isin').val();
				$('#name').val('');
				$('#Performance Year1').val('');
				$('#Performance Year2').val('');
				$('#Performance Year3').val('');
				
			}

		});
		
	});
	
});