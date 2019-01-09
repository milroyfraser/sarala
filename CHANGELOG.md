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

## v0.3.0 - 2018-03-16

### Fixed
- [Updated `.clone` to deep clone the model](https://sarala-io.gitbooks.io/sarala/content/helpers/clone.html)

### Added
- [Added the ability to override the collection object](https://sarala-io.gitbooks.io/sarala/content/helpers/collection-pipeline.html)

## v0.3.1 - 2018-03-17

### Added
- [Added `.limit(10)` and `.offset(20)`.](https://sarala-io.gitbooks.io/sarala/content/fetching-data/filtering.html)

## v0.3.2 - 2018-04-05

### Fixed
- [Response parser bug fix #3](https://github.com/milroyfraser/sarala/issues/3) : [f48eeb0](https://github.com/milroyfraser/sarala/commit/f48eeb05f98d052b6278261b56bc6dbf8702888b)

## v0.3.4 - 2019-01-02
- security update

## v0.3.5, v0.3.6, v0.3.7 - 2019-01-09
- added api docs
- shit happens: fixed npm issues

## v0.3.8 - 2019-01-09
- Introduced headers preparation [#6](https://github.com/milroyfraser/sarala/pull/6)

## v0.3.9 - 2019-01-09

### Fixed
- [Cannot read property 'self' of undefined](https://github.com/milroyfraser/sarala/issues/7): Generate self url when needed.
