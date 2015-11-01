// data: {name: value}
// type: scheme.role - may be 'text' or 'select' or 'check' or 'radio'
/**
 *
 * @type {Field}
 */
var Field = require('./field');

/**
 *
 * @type {Inline|Field}
 */
module.exports = Inline;

/**
 * @class Inline
 */
function Inline() {
}

/**
 *
 * @type {Field.prototype}
 */
Inline.prototype = Object.create(Field.prototype);

/**
 *
 * @returns {string}
 */
Inline.prototype.getContentAfter = function () {

  return this.model.get('scheme.content.after');
};

/**
 *
 * @returns {number}
 */
Inline.prototype.getContentAfterLength = function () {

  var contentAfter = this.getContentAfter();

  if (contentAfter) {
    return contentAfter.length
  }
  return 0;
};

/**
 *
 * @returns {string}
 */
Inline.prototype.toString = function () {

  return this.getNodeContent() + this.getContentAfter();
};

/**
 *
 * @returns {number}
 */
Inline.prototype.getBeforeSymbolsCount = function () {

  var node = this.getNode();
  var count = 0;

  while ((node = node.previousElementSibling)) {

    count += (node.textContent.length + this.getElementComponent(node).getContentAfterLength());
  }
  return count;
};

