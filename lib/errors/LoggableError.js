'use strict';

var
  Dummy = require('../types/Dummy'),
  extend = require('../helpers/extend');

function LoggableError(message) {
  var
    name = 'LoggableError',
    obj = new Dummy(name);

  this.message = message;
  this.name = name;

  Error.captureStackTrace(obj, LoggableError);
  this.stack = obj.stack;
}

LoggableError.prototype = Object.create(Error.prototype);
LoggableError.prototype.constructor = LoggableError;

LoggableError.extend = extend;

module.exports = LoggableError;
