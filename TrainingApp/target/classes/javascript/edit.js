function saveValue(isin){

		var isin = $('.isinNumber'+isin).text();
		var name = $('#editable'+'.name'+isin).text();
		var performance_1yr = $('#editable'+'.perf1'+isin).text();
		var performance_2yr = $('#editable'+'.perf2'+isin).text();
		var performance_3yr = $('#editable'+'.perf3'+isin).text();
		var person = {
				"isin" : isin,
				"name" : name,
				"Performance Year1" : performance_1yr,
				"Performance Year2" : performance_2yr,
				"Performance Year3" : performance_3yr,

			};
		var formData = $(person).serialize();

		$.ajax({
			url : "/TrainingApp/edit",
			method : "POST",
			data : formData,
			success : function(data, status, xhr) {
				$("#status_text").html(data);
				$('#isin').val();
				$('#name').val('');
				$('#Performance Year1').val('');
				$('#Performance Year2').val('');
				$('#Performance Year3').val('');
				button.remove();

			}

		});

}