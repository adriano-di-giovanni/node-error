'use strict';

var
  Dummy = require('../types/Dummy'),
  extend = require('../helpers/extend');

function ProxiedError(error) {
  var
    name = error.name,
    obj = new Dummy(name);

  this.message = error.message;
  this.name = name;

  if ( ! error.stack) {
    Error.captureStackTrace(obj, ProxiedError);
  }
  this.stack = error.stack || obj.stack;
}

ProxiedError.prototype = Object.create(Error.prototype);
ProxiedError.prototype.constructor = ProxiedError;

ProxiedError.extend = extend;

module.exports = ProxiedError;
