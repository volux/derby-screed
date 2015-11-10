/**
 *
 * @type {Editable}
 */
var Editable = require('./editable');

/**
 *
 * @type {Cell|Editable|*}
 */
module.exports = Cell;

/**
 * Must be empty - DerbyJS rule
 * @class Cell
 * @constructor
 */
function Cell() {
}

/**
 *
 * @type {Editable.prototype}
 */
Cell.prototype = Object.create(Editable.prototype);

Cell.prototype.isCell = true;

/**
 *
 * @param [cbFn] {Function}
 */
Cell.prototype.remove = function (cbFn) {

  if (cbFn) {

    this.parent.removeChildren(this.getIndex(), 1, cbFn);
  }
};

/**
 *
 * @returns {null|Cell|Editable|*}
 */
Cell.prototype.getPrevEditable = function () {

  var prevEditable = this.getPrevComponent();

  if (!prevEditable) {

    var prevRow = this.parent.getPrevComponent();

    if (prevRow) {

      prevEditable = prevRow.getLastChild();
    }
  }
  if (!prevEditable || !prevEditable.isEditable) {

    return null;
  }
  return prevEditable;
};

/**
 *
 * @returns {null|Cell|Editable|*}
 */
Cell.prototype.getNextEditable = function () {

  var nextEditable = this.getNextComponent();

  if (!nextEditable) {

    var nextRow = this.parent.getNextComponent();

    if (nextRow) {

      nextEditable = nextRow.getFirstChild();
    }
  }
  if (!nextEditable || !nextEditable.isEditable) {

    return null;
  }
  return nextEditable;
};
