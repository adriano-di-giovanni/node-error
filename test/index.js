'use strict';

var
  path = require('path'),
  assert = require('assert');

var
  basePath = process.cwd(),
  equal = assert.equal,

  ExtendableError = require(path.resolve(basePath+'/lib/error')).ExtendableError,
  LoggableError = require(path.resolve(basePath+'/lib/error')).LoggableError,
  ProxiedError = require(path.resolve(basePath+'/lib/error')).ProxiedError;

describe('ExtendableError', function () {
  it('instantiate', function () {
    var
      error = new ExtendableError();

    equal(error.name, 'ExtendableError');

    console.log(error);
  });
});

describe('LoggableError', function () {
  it('instantiate', function () {
    var
      error = new LoggableError();

    equal(error.name, 'LoggableError');
    equal(error.propertyIsEnumerable('stack'), true);

    console.log(error);
  });
});

describe('ProxiedError', function () {
  it('instantiate', function () {
    var
      error = new ProxiedError(new Error('message'));

    equal(error.name, 'Error');
    equal(error.message, 'message');
    equal(error.propertyIsEnumerable('stack'), true);
  });
});

describe('ExtendableError subclass', function () {
  var
    version = require(path.resolve(basePath+'/package')).version;

  it('extend without attributes and instantiate', function () {
    var
      SubError = ExtendableError.extend('SubError'),
      error = new SubError();

    equal(error.name, 'SubError');
    equal(error instanceof SubError, true);
    equal(typeof SubError.extend, 'function');
  });

  it('extend with attributes hash and instantiate', function () {
    var
      attributes = { version: version },
      SubError = ExtendableError.extend('SubError', attributes),
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
      SubError = ExtendableError.extend('SubError', attributes),
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
      BaseError = ExtendableError.extend('SubError', attributes),
      SubError = BaseError.extend('SubError'),
      error = new SubError();

    equal(error.name, 'SubError');
    equal(error.attributes.version, version);
    assert.deepEqual(error.attributes.memoryUsage, memoryUsage);
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

describe('ProxiedError subclass', function () {
  var
    version = require(path.resolve(basePath+'/package')).version;

  it('extend without attributes and instantiate', function () {
    var
      SubError = ProxiedError.extend(),
      error = new SubError(new Error('message'));

    equal(error.name, 'Error');
    equal(error instanceof SubError, true);
    equal(typeof SubError.extend, 'function');
  });

  it('extend with attributes hash and instantiate', function () {
    var
      attributes = { version: version },
      SubError = ProxiedError.extend(null, attributes),
      error = new SubError(new Error('message'));

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
      SubError = ProxiedError.extend(null, attributes),
      error = new SubError(new Error('message'));

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
      BaseError = ProxiedError.extend(null, attributes),
      SubError = BaseError.extend('SubError'),
      error = new SubError(new Error());

    equal(error.name, 'SubError');
    equal(error.attributes.version, version);
    assert.deepEqual(error.attributes.memoryUsage, memoryUsage);
  });
});
