function saveValue(isin){

		var isin = $('.isinNumber'+isin).text();
		var name = $('#editable'+'.name'+isin).text();
		var performance_1yr =  parseFloat($('#editable'+'.perf1'+isin).text());
		var performance_2yr =  parseFloat($('#editable'+'.perf2'+isin).text());
		var performance_3yr =  parseFloat($('#editable'+'.perf3'+isin).text());
		
		var person = {
				"isin" : isin,
				"name" : name,
				"performance_1yr" : performance_1yr,
				"performance_2yr" : performance_2yr,
				"performance_3yr" : performance_3yr,
			};
		
		$.ajax({
			url : "/TrainingApp/edit",
			method : "POST",
			data : person,
			success : function(data, status, xhr) {
				$("#status_text").html(data);
				$('.isinNumber'+isin).text();
				$('#editable'+'.name'+isin).text();
				 parseFloat($('#editable'+'.perf1'+isin).text());
				 parseFloat($('#editable'+'.perf2'+isin).text());
				 parseFloat($('#editable'+'.perf3'+isin).text());

			}

		});

}