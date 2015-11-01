// data: {text: '', type: 'some'}
// shift for type & may be lookup for text by type
/**
 *
 * @type {Line}
 */
var Line = require('./line');

/**
 *
 * @type {Typed|Line}
 */
module.exports = Typed;

/**
 * @class Typed
 */
function Typed() {
}

/**
 *
 * @type {Line.prototype}
 */
Typed.prototype = Object.create(Line.prototype);

/**
 *
 * @returns {string}
 */
Typed.prototype.getType = function () {

  return this.model.get('data.type');
};

/**
 *
 * @param type {string}
 * @returns {boolean}
 */
Typed.prototype.isType = function (type) {

  return this.getType() == type;
};

/**
 *
 * @param type {string}
 * @param [cbFn] {Function}
 * @returns {Typed}
 */
Typed.prototype.setType = function (type, cbFn) {

  this.model.set('data.type', type, cbFn);
  return this;
};

/**
 * exception for Typed (used in saveLookup)
 * @returns {string}
 */
Typed.prototype.getName = function () {

  return this.getType();
};

/**
 *
 * @param caret {number}
 * @param [cbFn] {Function}
 * @returns {*|Base|Editable|Typed}
 */
Typed.prototype.newLineAfterCaret = function (caret, cbFn) {

  var nextIndex = this.getIndex() + 1;
  var nextType = this.parent.getNextChildType(this);
  var nextText = this.cropText(caret, true);
  var nextChild = this.parent.insertBlankChild(nextIndex).getChild(nextIndex);

  nextChild.setType(nextType).setDataText(nextText);

  if (!cbFn) {

    return nextChild;
  }
  cbFn();
  return this;
};

