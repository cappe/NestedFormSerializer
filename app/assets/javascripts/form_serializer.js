;(function($, window, document, undefined) {

	// Plugin constructor
	function Serializer(element, action) {
		if (action === 'serialize') {
			this.form = element.serializeArray();
			this.data = {};
		}
		if (action === 'deserialize') {
			this.data = element[0];
			this.fields = {};
		}
	}

	/*
	 *		Private methods
	 */

	// Builds json object based on input fields
	function buildJsonObject(name, value) {
		var keys = name.match(/[a-z0-9_]+|(?=\[\])/gi), k;

		while ((k = keys.pop()) !== undefined) {
			value = buildRow({}, k, value);
		}

		return value;
	}

	// Builds a new row for json object
	function buildRow(base, key, value) {
		base[key] = value;
		return base;
	}

	// Deserializes form field names and values
	function deserializeFields(object, fields, field_name) {
		field_name = field_name ?
				field_name : '';

		$.each(object, function(key, value) {
			var field = field_name === '' ?
					key : field_name + '[' + key + ']';

			typeof value === 'object' ?
					deserializeFields(value, fields, field) : fields[field] = value;
		});
	}

	/*
	 *		Private methods ends
	 */


	/*
	 *		Public methods
	 */

	// Return data serialized by input field names
	Serializer.prototype.getSerializedData = function() {
		return this.data;
	};

	// Return data deserialized by input field names
	Serializer.prototype.getDeserializedData = function() {
		return this.fields;
	};

	// Serialize input name fields and values
	Serializer.prototype.serializeData = function() {
		var $form = this.form;

		for (var i = 0; i < $form.length; i++) {
			var name = $form[i].name;
			var value = $form[i].value;
			var obj = buildJsonObject(name, value);
			$.fn.extend(true, this.data, obj);
		}

		return this;
	};

	// Deserialize input name fields and values
	Serializer.prototype.deserializeData = function() {
		var data = this.getSerializedData();
		deserializeFields(data, this.fields);

		return this;
	};

	/*
	 *		Public methods ends
	 */


	/*
	 *		Wrapper methods for public usage
	 */

	$.fn.serializeData = function() {
		return new Serializer(this, 'serialize')
				.serializeData()
				.getSerializedData();
	};

	$.fn.deserializeData = function() {
		return new Serializer(this, 'deserialize')
				.deserializeData()
				.getDeserializedData();
	};

	/*
	 *		Wrapper methods ends
	 */

}(jQuery, window, document));