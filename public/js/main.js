(function(){
	'use strict';
	
	$('input[type="date"]').datepicker({
		language: 'fi',
		format: 'd.m.yyyy',
		weekStart: 1
	});
	
	$('#main-form').submit(function(e){
		var values = {};
		e.preventDefault();
		for(var i = 0; i < e.target.length; i++){
			var element = $(e.target[i]);
			if(element.is('input') || element.is('textarea') || element.is('select')){
				if(element.attr('type') == 'checkbox'){
					if(element.is(':checked')){
						if(values.hasOwnProperty(element.attr('name'))){
							values[element.attr('name')].push(element.val());
						}else{
							values[element.attr('name')] = [element.val()];
						}
					}
				}else if(element.attr('type') == 'radio'){
					if(element.is(':checked')){
						values[element.attr('name')] = element.val();
					}
				}else if(element.attr('type') == 'date'){
					if(typeof(element.val()) !== 'undefined' && element.val() !== ''){
						values[element.attr('name')] = moment(element.val(), 'D.M.YYYY').toDate();
					}	
				}else{
					values[element.attr('name')] = element.val();
				}
			}
		}
		$('#loader-img').show();
		$('.error-container').remove();
		$.post('/application', values, function(res){
			noty({
			    text: 'Kesätyöhakemus lähetetty onnistuneesti.',
				type: 'success',
				timeout: 3000,
			    animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			$('input,textarea').val('');
			$('#loader-img').hide();
		}).fail(function(err){
			noty({
			    text: 'Hakemuksen lähetys epäonnistui, tarkista kentät ja yritä uudelleen.',
				type: 'error',
				timeout: 3000,
			    animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			var errors = err.responseJSON;
			for(var i = 0; i < errors.length;i++){
				var error = errors[i];
				if(typeof(error.param) !== 'undefined'){
					$('label[for="'+error.param+'"]').after('<span class="error-container">'+error.msg+'</span>');
				}
			}
			$('#loader-img').hide();
		});
	});
	
	$('input[name="driversLicenceInput"]').change(function(e){
		var anyChecked = false;
		$('input[name="driversLicenceInput"]').each(function(e){
			if($(this).is(':checked')){
				anyChecked = true;
			}
		});
		if(anyChecked){
			$('input[name="driverslicenceyearInput"]').removeAttr('disabled');
			$('input[name="driverslicenceyearInput"]').attr('required', '');
		}else{
			$('input[name="driverslicenceyearInput"]').removeAttr('required');
			$('input[name="driverslicenceyearInput"]').attr('disabled', '');
		}
	});
	
	$('#previouslyEmployedInput-1').change(function(e){
		$('input[name="whenEmployedInput"]').removeAttr('disabled');
		$('input[name="whenEmployedInput"]').attr('required', '');
	});
	
	$('#previouslyEmployedInput-0').change(function(e){
		$('input[name="whenEmployedInput"]').removeAttr('required');
		$('input[name="whenEmployedInput"]').attr('disabled', '');
	});
	
})();