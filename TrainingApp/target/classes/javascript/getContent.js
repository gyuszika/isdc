$(document).ready(function() {
	var persons = [];
	
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
	
	$('#search_field').on('keyup', function() {
		  var value = $(this).val();
		  var patt = new RegExp(value, "i");

		  $('#myTable').find('tr').each(function() {
		    if (!($(this).find('td').text().search(patt) >= 0)) {
		      $(this).not('.myHead').hide();
		    }
		    if (($(this).find('td').text().search(patt) >= 0)) {
		      $(this).show();
		    }

		  });

		 
		});

	$("#btn_getPerson").click(function() {
		
		var isin = $("#isin").val(),
			found = false;

		persons.forEach(function (person) {
			if (person.isin === +isin) {
				found = true;
			}
		});
		if (found) {
			return;
		}
		
			$.ajax({
				url : "/TrainingApp/getPerson" ,
				method : "GET",
				data : {
					"isin": isin
				},
				success : function(data, status, xhr) {
					persons.push(data);
					console.log(data);
					_createDom(data);	
				}

			});
	});
	
	$("#btn_getAllPerson").click(function() {
		$("#myTbody").empty();

		$.ajax({
			url : "/TrainingApp/getAllPerson",
			method : "GET",
			data: {},
			dataType: "json",
			
			success : function(data,status, xhr) {
				console.log(data);
				persons = data;
				
				$.each(data, function (i,item) {
					_createDom(item);
				});

			}

		});
	});
	
	function calculate (event) {
		console.log(isin);
		
		var table = $(this).parents('tr');
		
		var performance_1yr = table.find('.perf1').text();
		var performance_2yr = table.find('.perf2').text();
		var performance_3yr = table.find('.perf3').text();
		var total = parseFloat(performance_1yr) + parseFloat(performance_2yr) +  parseFloat(performance_3yr);
		
		var isinNumber = parseInt(table.find('.isinNumber').text());
	
		$.ajax({
			url : "/TrainingApp/person",
			method : "POST",
			success : function(status, xhr) {
				$("#status_text").html();
				$('.total' +isinNumber ).append(total);
				
			}

		});
	}
	
	function _createDom(data) {
		var newRow = $('<tr class="performance"></tr>');
		
		newRow.append("<td><button type='button' onclick='deleteValue("+data.isin+")' > Delete </button></td></td>");
		newRow.append("<i>"+"<td class ='isinNumber'>"+data.isin+"</td>"+"</i>");
		newRow.append("<td class = 'name'>"+data.name+"</td>");
		newRow.append("<td class='perf1'>"+data.performance_1yr+"</td>");
		newRow.append("<td class='perf2'>"+data.performance_2yr+"</td>");
		newRow.append("<td class='perf3'>"+data.performance_3yr+"</td>");
		newRow.append("<td class='total"+data.isin+"'></td>");
		newRow.append("<td><button type='button' id='"+data.isin+"'> Total </button></td></td>");
		$("#myTbody").append(newRow)
		
		$("#" + data.isin).click(calculate);
	}
	
		
	$("#clear_all").click(function() {
		$("#myTbody").empty();
			
		});
});