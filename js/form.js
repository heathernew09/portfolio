$('.loading').hide();
$('input, textarea').placeholder(); // Placeholder Browser Compatibility Plugin

function validateForm() {
	var form_message_success = "Thank you for your email, we will be in contact with you shortly",
			form_checker = document.forms["ctsForm"]["formChecker"].value,
			data = $(this).serialize(),
			action = $(this).attr("action"),
			method = $(this).attr("method");
	// Spam Filter
	if (form_checker != "") {
		console.log("spam detected");
		return false;
	}
	$(".loading").show(); // show loading gif
	// alerts & email
	$.ajax({
		url: action,
		type: method,
		data: data,
		success: function(data) {
			$(".loading").hide();
			$('.alert-message-wrap').remove();
			$('.alert-wrap').css({'display':'block'});
			$('.alert-wrap').append('<div class="alert-message-wrap alert-success"><span class="alert-message"><i class="fa fa-check"></i>' + form_message_success + '</span></div>').delay(2000).fadeOut('slow');
		},
		error: function(err) {
			console.log('email form did not submit');
			$(".loading").hide();
			$('.alert-message-wrap').remove();
			$('.alert-wrap').css({'display':'block'});
			$('.alert-wrap').append('<div class="alert-message-wrap alert-fail"><span class="alert-message"><i class="fa fa-exclamation-circle"></i>' + form_message_success + '</span></div>').delay(2000).fadeOut('slow');
		},
		complete: function() {
			$(".loading").hide();
		}
	});
	return false; // don't let the form be submitted
}