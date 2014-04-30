'use strict';

var
  extend = require('../helpers/extend');

function ExtendableError(message) {
  var
    name = 'ExtendableError';

  this.message = message;
  this.name = name;

  Error.captureStackTrace(this, ExtendableError);
}

ExtendableError.prototype = Object.create(Error.prototype);
ExtendableError.prototype.constructor = ExtendableError;

ExtendableError.extend = extend;

module.exports = ExtendableError;
