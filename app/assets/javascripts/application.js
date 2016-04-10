// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require form_serializer
//= require_tree .

$(document).ready(function() {

	$('#submit-btn').click(function(e) {
		e.preventDefault();

		var $form = $('#submit-form');
		var inputs = $form.serializeData();

		$.ajax({
			url: '/submit',
			dataType: 'json',
			data: {
				data: inputs
			},
			success: function(resp) {
				var deserialized_resp = $(resp).deserializeData();
				$.each(deserialized_resp, function(name, value) {
					$("input[name='" + name + "']", $form).val(value);
				})
			},
			error: function() {
				alert('Something went wrong!');
			}
		})

	});

});
