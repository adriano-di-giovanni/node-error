'use strict';

function extend(name, attributes) {
  /* jshint validthis: true */
  var
    parent = this,
    child = function () {
      parent.apply(this, arguments);

      if (name) {
        this.name = name;
      }

      if (attributes) {
        this.attributes = typeof attributes === 'function' ? attributes() : attributes;
      }
    },
    Surrogate = function () {
      this.constructor = child;
    };

    child.extend = parent.extend;

    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

  return child;
}

module.exports = extend;
