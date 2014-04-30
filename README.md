# Error

Error is a library of extendable custom errors for node.js.

## Installation

```
npm node-error --save
```

## Usage

Errors in the library can be instantiated directly

```javascript
var
	LoggableError = require('node-error').LoggableError;

throw new LoggableError('message');
```

or extended using `.extend(name, [attributes])`:

```javascript
var
	LoggableError = require('node-error').LoggableError;

var
	attributes = function () {
		return {
			memoryUsage: process.memoryUsage()
		};
	},
	CustomError = LoggableError.extend('CustomError', attributes);
```

The `attributes` argument to the `extend` method is optional.
It can be of type object or function.
The function executes upon error instantiation and it should return an object.

```javascript
var
	error = new CustomError('message');

console.log(error.attributes);
```

## Errors

### ExtendableError

ExtendableError is the base error to extend using `.extend` method.

### LoggableError

LoggableError is an error having the `stack` property enumerable.

### ProxiedError

```javascript
var
	ProxiedError = require('node-error').ProxiedError;

var
	error = new ProxiedError(new Error());
```
