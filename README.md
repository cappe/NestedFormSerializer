*This project is work in progress*

# NestedFormSerializer

## TL;DR
1. Serializes HTML input data into nested arrays based on input field names 
2. Deserializes nested arrays back into key-value pairs where the keys are the original field names

## Motivation
I needed a way to
* convert HTML input data into nested arrays based on input field names
* convert the nested arrays into key-value pairs where the keys are the original input field names

I couldn't find any simple JS implementation for both of these operations, hence the plugin. In addition, this is my first JS plugin so it is also for practising purposes.

## Examples
### Serializing HTML form data
If HTML form had two fields: *addresses[billing][street]* and *addresses[billing][zip]*, the plugin would convert these fields into nested arrays like this:

```javascript
array( addresses =>
	array( billing =>
		array(	street 	=> input_value1,
				zip 	=> input_value2
		)
	)
)
```
### Deserializing HTML form data
The plugin would deserialize the nested arrays above into key-value pairs where the keys would be the original field names:

```javascript
array( 	addresses[billing][street] 	=> input_value1,
		addresses[billing][zip]		=> input_value2
)
```

## TODO
* Support for all input types
* Support for custom options
* Improve README by adding documentation and examples
* Test suite

