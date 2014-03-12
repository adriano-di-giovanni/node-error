'use strict';

var
  path = require('path'),
  assert = require('assert');

var
  basePath = process.cwd(),
  equal = assert.equal,

  LoggableError = require(path.resolve(basePath+'/lib/error')).LoggableError;

describe('LoggableError', function () {
  it('instantiate', function () {
    var
      error = new LoggableError();

    equal(error.name, 'LoggableError');
    equal(error.propertyIsEnumerable('stack'), true);
  });
});

describe('LoggableError subclass', function () {
  var
    version = require(path.resolve(basePath+'/package')).version;

  it('extend without attributes and instantiate', function () {
    var
      SubError = LoggableError.extend('SubError'),
      error = new SubError();

    equal(error.name, 'SubError');
    equal(error instanceof SubError, true);
    equal(typeof SubError.extend, 'function');
  });

  it('extend with attributes hash and instantiate', function () {
    var
      attributes = { version: version },
      SubError = LoggableError.extend('SubError', attributes),
      error = new SubError();

    assert.deepEqual(error.attributes, attributes);
  });

  it('extend with attributes function and instantiate', function () {
    var
      memoryUsage = process.memoryUsage(),
      attributes = function () {
        return {
          version: version,
          memoryUsage: memoryUsage
        };
      },
      SubError = LoggableError.extend('SubError', attributes),
      error = new SubError();

    equal(error.attributes.version, version);
    assert.deepEqual(error.attributes.memoryUsage, memoryUsage);
  });

  it('extend a suberror and instantiate', function () {
    var
      memoryUsage = process.memoryUsage(),
      attributes = function () {
        return {
          version: version,
          memoryUsage: memoryUsage
        };
      },
      BaseError = LoggableError.extend('SubError', attributes),
      SubError = BaseError.extend('SubError'),
      error = new SubError();

    equal(error.name, 'SubError');
    equal(error.attributes.version, version);
    assert.deepEqual(error.attributes.memoryUsage, memoryUsage);
  });
});
