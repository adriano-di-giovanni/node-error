'use strict';

function Dummy(name) {
  this.name = name;
}

Dummy.prototype.toString = function () {
  return this.name;
};

module.exports = Dummy;