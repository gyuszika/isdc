$(document).ready(function() {
	function search() {
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

	$("#btn_search").click(function(e) {
		e.preventDefault();

		var isin = $('#isin').val();
		var name = $('#name').val();
		var performance_1yr = $('#Performance Year1').val();
		var performance_2yr = $('#Performance Year2').val();
		var performance_3yr = $('#Performance Year3').val();

		var formData = $("#form").serialize();

		var person = {
			"isin" : isin,
			"name" : name,
			"Performance Year1" : performance_1yr,
			"Performance Year2" : performance_2yr,
			"Performance Year3" : performance_3yr,

		};

		$.ajax({
			url : "/TrainingApp/search",
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