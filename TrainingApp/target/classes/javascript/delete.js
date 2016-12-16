function deleteValue(x) {
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
		
		deleteItem(x);
	}

	
	function deleteItem(isin) {
		
		$.ajax({
			url : '/TrainingApp/delete' + '?' + $.param({"isin": isin}),
			 type: 'DELETE',
			data :{
				"isin": isin
			},
			success : function(data, status, xhr) {
				console.log(data);
				_removeDom(data);

			}

		});

	}
	
	function _removeDom(data) {
		var row = $('<tr class="performance" id="'+data.isin+'"></tr>');
		
		row.remove("<td><button type='button' onclick='deleteValue("+data.isin+")' > Delete </button></td></td>");
		row.remove("<td class ='isinNumber'>"+data.isin+"</td>");
		row.remove("<td class = 'name'>"+data.name+"</td>");
		row.remove("<td class='perf1'>"+data.performance_1yr+"</td>");
		row.remove("<td class='perf2'>"+data.performance_2yr+"</td>");
		row.remove("<td class='perf3'>"+data.performance_3yr+"</td>");
		row.remove("<td class='total"+data.isin+"'></td>");
		row.remove("<td><button type='button' id='"+data.isin+"'> Total </button></td></td>");
		$("#myTbody").empty(row)
		$("#" + data.isin).on("click",remove);
	}
