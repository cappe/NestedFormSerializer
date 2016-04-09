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
//= require test
//= require_tree .

$(document).ready(function() {



	$('#submit-btn').click(function(e) {
		e.preventDefault();

		var $form = $('#submit-form');

		//var asd = $form.serializeObject();
		//console.log(asd);

		var form_data = $form.serializeArray();

		console.log($form.serializeForm());

		$.ajax({
			url: '/submit',
			data: {
				data: form_data
			},
			success: function(response) {

			},
			error: function() {
				alert('Something went wrong!');
			}
		})

	});
});

;(function ($, window, document, undefined) {

	// The actual plugin constructor
	function Serializer(element) {
		this.element = element;
		this.data = {};
		this.form = this.element.serializeArray();
	}

	// Return input fields
	Serializer.prototype.getData = function() {
		return this.data;
	};

	// Serialize input name fields
	Serializer.prototype.serializeForm = function() {
		var $form = this.form;

		for (var i = 0; i < $form.length; i++) {
			var name = $form[i].name;
			var value = $form[i].value;
			var obj = buildJsonTree(name, value);
			$.fn.extend(true, this.data, obj);
		}

		return this;
	};

	Serializer.prototype.deserializeForm = function() {

	};

	function buildJsonTree(name, value) {
		var keys = name.match(/[a-z0-9_]+|(?=\[\])/gi), k;

		while ((k = keys.pop()) !== undefined) {
			value = buildRow({}, k, value);
		}

		return value;
	}

	function buildRow(base, key, value) {
		base[key] = value;
		return base;
	}


	$.fn.serializeForm = function() {
		return new Serializer(this).serializeForm().getData();
	};

}(jQuery, window, document));