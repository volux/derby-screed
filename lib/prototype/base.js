/**
 *
 * @type {_|lodash|exports|module.exports}
 */
var _ = require('lodash');

/**
 *
 * @type {Base}
 */
module.exports = Base;

/**
 * @class Base
 */
function Base() {
}

/**
 *
 * @type {string}
 */
Base.prototype.dataSuffix = '';

/**
 * TODO move to Unit?
 * @returns {string}
 */
Base.prototype.getPlaceholder = function () {

  return this.model.get('scheme.content.placeholder') || '';
};

/**
 *
 * @returns {string}
 */
Base.prototype.getName = function () {

  return this.model.get('scheme.name');
};

/**
 *
 * @returns {string}
 */
Base.prototype.getRole = function () {

  return this.model.get('scheme.role');
};

/**
 *
 * @returns {string}
 */
Base.prototype.getContentType = function () {

  return this.model.get('scheme.content.type');
};

/**
 *
 * @param type {string|Array}
 * @returns {boolean}
 */
Base.prototype.isContentType = function (type) {

  if (typeof type === 'string') {
    type = [type];
  }
  return type.indexOf(this.getContentType()) > -1;
};

/**
 *
 * @returns {boolean|string}
 */
Base.prototype.getContentMerge = function () {

  return this.model.get('scheme.content.merge');
};

/**
 *
 * @param merge {boolean|string}
 * @returns {boolean}
 */
Base.prototype.isContentMerge = function (merge) {

  return this.getContentMerge() === merge;
};

/**
 *
 * @returns {boolean}
 */
Base.prototype.isContentInput = function () {

  return this.model.get('scheme.content.type') === 'input';
};

/**
 *
 * @returns {boolean}
 */
Base.prototype.isContentLookup = function () {

  var extend = this.model.get('scheme.content.extend');

  if (!extend) {

    return false;
  }

  var result = extend['with'] === 'lookup';

  if (!result) {

    return false;
  }
  if (extend['by']) {

    var method = 'get' + extend['by'].charAt(0).toUpperCase() + extend['by'].slice(1);

    if (this[method] && this[method]() === extend['is']) {

      return true;
    }
  }
  return false;
};

/**
 *
 * @returns {boolean}
 */
Base.prototype.isEventContext = function () {

  return false;
};

/**
 *
 * @returns {*}
 */
Base.prototype.scope = function () {

  return this.model.at('data' + this.dataSuffix);
};

/**
 *
 * @returns {Array|Object}
 */
Base.prototype.getData = function () {

  return this.model.get('data' + this.dataSuffix);
};

/**
 *
 * @param data {number|string|Array|Object}
 * @param [cbFn] {Function}
 * @returns {Base}
 */
Base.prototype.setData = function (data, cbFn) {

  this.model.set('data' + this.dataSuffix, data, cbFn);

  return this;
};

/**
 *
 * @returns {Array|Object}
 */
Base.prototype.getDataCopy = function () {

  return this.model.getDeepCopy('data');
};

/**
 *
 * @returns {number|String|Array|Object}
 */
Base.prototype.getBlankData = function() {

  return this.model.getDeepCopy('blank');
};

/**
 *
 * @param on {string}
 * @param list {[string]}
 * @param value {string}
 * @param dir {number}
 * @returns {string}
 */
Base.prototype.shiftedValue = function (on, list, value, dir) {

  if (!list) {

    return value;
  }

  var currentIndex = list.indexOf(value);
  var nextIndex = currentIndex + dir;
  var methods = {

    /**
     * there to end and from start again
     * @param list {Array}
     * @param index {number}
     * @returns {string}
     */
    'ring': function (list, index) {

      switch (index) {

        case list.length:
          index = 0;
          break;

        case -1:
          index = list.length - 1;
          break;
      }
      return list[index];
    },

    /**
     * there and back
     * @param list {Array}
     * @param index {number}
     * @returns {string}
     */
    'line': function (list, index) {

      switch (index) {

        case list.length:
          index = list.length - 1;
          break;

        case -1:
          index = 0;
          break;
      }
      return list[index];
    }
  };

  return methods[on](list, nextIndex);
};

/**
 *
// * @returns {boolean}
 */
//Base.prototype.isContentShift = function () {
//
//  return this.model.get('scheme.content.shift') !== false;
//};

/**
 *
 * @param name {string}
 * @returns {Array}
 */
Base.prototype.getLookupList = function(name) {

  return this.parent.getLookupList(name);
};

/**
 *
 * @param dir {number}
 * @param [alt] {boolean}
 * @returns {Base}
 */
Base.prototype.shift = function (dir, alt) {

  var path = 'scheme.content.shift';

  if (alt) {
    path = 'scheme.content.altShift';
  }

  var shiftScheme = this.model.get(path);

  if (!shiftScheme) {

    return this;
  }

  var list = [];
  var shiftFor = shiftScheme['for'];

  switch (shiftScheme['ruler']) {

    case 'lookup':

      list = this.getLookupList(this.getName());
      break;

    case 'items':

      list = _.pluck(shiftScheme['items'], 'name');
      break;

    case 'spinner':

      var value = this.getValue();
      list = [value - 1, value, value + 1];
      break;

    case 'custom':

      list = this.parent.getShiftList(shiftFor, this);
      break;

  }

  shiftFor = shiftFor.charAt(0).toUpperCase() + shiftFor.slice(1);
  this['set' + shiftFor](
    this.shiftedValue(
      shiftScheme['on'],
      list,
      this['get' + shiftFor](),
      dir
    )
  );

  return this;
};

/**
 * TODO it for boolean data, need for number (1|0)
 * @param [cbFn] {Function}
 * @returns {Base}
 */
Base.prototype.toggle = function (cbFn) {

  this.setData(!this.getData(), cbFn);
  return this;
};

/**
 *
 * @returns {boolean}
 */
Base.prototype.remove = function () {

  return false;
};

