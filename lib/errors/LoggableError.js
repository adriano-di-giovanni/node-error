'use strict';

function LoggableError(message) {
  var
    obj = {};

  this.message = message;
  this.name = 'LoggableError';

  Error.captureStackTrace(obj, LoggableError);
  this.stack = obj.stack;
}

LoggableError.prototype = Object.create(Error.prototype);
LoggableError.prototype.constructor = LoggableError;

LoggableError.extend = require('../helpers/extend');

module.exports = LoggableError;
