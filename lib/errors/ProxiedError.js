'use strict';

function ProxiedError(error) {
  this.message = error.message;
  this.name = error.name;
  this.stack = error.stack;
}

ProxiedError.prototype = Object.create(Error.prototype);
ProxiedError.prototype.constructor = ProxiedError;

ProxiedError.extend = require('../helpers/extend');

module.exports = ProxiedError;
