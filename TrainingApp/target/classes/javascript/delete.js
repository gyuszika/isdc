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
			url : '/TrainingApp/delete',
			method: 'GET',
			data :{
				"isin": isin
			},
			success : function(data, status, xhr) {
				console.log(isin);
				_removeDom(isin);

			},
			error: function (data) {
				console.log('failed', data);
			}

		});

	}
	
	function _removeDom(isin) {
		var row = $('tr.performance'+isin);
		$(row).remove();
	}
