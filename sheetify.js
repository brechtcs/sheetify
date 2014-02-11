var styledeps = require('style-deps')
var resolve = require('style-deps/resolve')
var xtend = require('xtend')

module.exports = Sheetify

// for now, stylify has no "core"
// modules.
var core = {}

function Sheetify(entry) {
  if (!(this instanceof Sheetify)) return new Sheetify(entry)
  if (Array.isArray(entry) && entry.length > 1) throw new Error(
    'Support for more than one entry css file ' +
    'is not currently available.'
  )

  this.transforms = []
  this.modifiers = []

  this.entry = Array.isArray(entry)
    ? entry[0]
    : entry
}

Sheetify.prototype.transform = function(transform) {
  this.transforms.push(transform)
  return this
}

Sheetify.prototype.modifier = function(modifier) {
  this.modifiers.push(modifier)
  return this
}

Sheetify.prototype.bundle = function(opts, done) {
  styledeps(this.entry, xtend(opts || {}, {
      transforms: this.transforms
    , modifiers: this.modifiers
  }), done)
}
