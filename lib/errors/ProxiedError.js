'use strict';

function ProxiedError(error) {
  var
    obj = {};

  this.message = error.message;
  this.name = error.name;

  if ( ! error.stack) {
    Error.captureStackTrace(obj, ProxiedError);
  }
  this.stack = error.stack || obj.stack;
}

ProxiedError.prototype = Object.create(Error.prototype);
ProxiedError.prototype.constructor = ProxiedError;

ProxiedError.extend = require('../helpers/extend');

module.exports = ProxiedError;
