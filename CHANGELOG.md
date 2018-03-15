# Changelog

All notable changes to `sarala` will be documented in this file.

## v0.2.2 - 2018-03-10

### Fixed
- Generating malformed url when querying from same instance multiple times

## v0.2.3 - 2018-03-10

### Added
- Introduced data format configuration. Now `dates` method should return an object. key name is the field name and value format will be used to serialize date value before sending it back to the api.

### Removed
- `dataFormat` method has been removed from Model class.

## v0.2.4 - 2018-03-11

### Added
- Accept `Date` object, `string` or `moment` object as date field value.

## v0.2.5 - 2018-03-16

### Added
- Added the ability to clone an model object by calling `modelObj.clone();`.
