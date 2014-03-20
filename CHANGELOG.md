# Change Log

## 0.1.0

Initial release

## 0.1.1

### Bug fixes

* LoggableError.extend didn't copy itself to the extended constructor

## 0.1.2

* Added `ProxiedError` to make third-party errors loggable

## 0.1.3

* Added stack trace to ProxiedError

## 0.1.4

* Added `types/Dummy`. Instances of type `Dummy` are subject to `Error.captureStackTrace`. `Dummy#toString` returns `Dummy#name`
