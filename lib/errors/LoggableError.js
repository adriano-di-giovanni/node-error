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

LoggableError.extend = function (name, attributes) {
  var
    parent = this,
    child = function () {
      parent.apply(this, arguments);

      this.name = name;

      if (attributes) {
        this.attributes = typeof attributes === 'function' ? attributes() : attributes;
      }
    },
    Surrogate = function () {
      this.constructor = child;
    };

    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

  return child;
};

module.exports = LoggableError;
