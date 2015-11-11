// Like the p (paragraph)
// data: {text: ''}
// shift false
/**
 *
 * @type {Editable}
 */
var Editable = require('./editable');

/**
 *
 * @type {Line|Editable}
 */
module.exports = Line;

/**
 * @class Line
 */
function Line() {
}

/**
 *
 * @type {Editable.prototype}
 */
Line.prototype = Object.create(Editable.prototype);

Line.prototype.isLine = true;

/**
 *
 * @type {string}
 */
Line.prototype.dataSuffix = '.text';

/**
 *
 * @param [cbFn] {Function}
 * @returns {*|Array|Object}
 */
Line.prototype.remove = function (cbFn) {

  return this.parent.removeChildren(this.getIndex(), 1, cbFn);
};

/**
 * TODO use merge scheme
 * @returns {boolean}
 */
Line.prototype.glueWithPrevious = function () {

  var prevLine = this.getPrevComponent();

  if (prevLine) {

    var self = this;
    var prevText = prevLine.getDataText();
    var elText = this.getDataText();

    prevLine.setDataText(prevText + elText, false, function () {

      if (prevLine.getDataText() === '') {

        prevLine.blur().setNodeContent(prevLine.getPlaceholder());
      }
      prevLine.moveCursorTo(prevText.length);
      self.remove();
    });

    return true;
  }
  return false;
};

/**
 * TODO use merge scheme
 * @returns {boolean}
 */
Line.prototype.glueWithNext = function () {

  var nextLine = this.getNextComponent();

  if (nextLine) {

    var self = this;
    var nextText = nextLine.getDataText();
    var elText = this.getDataText();

    this.setDataText(elText + nextText, false, function () {

      if (self.getDataText() === '') {

        self.blur().setNodeContent(self.getPlaceholder());
      }
      self.moveCursorTo(elText.length); // not exactly to end
      nextLine.remove();
    });

    return true;
  }
  return false;
};

/**
 *
 * @param caret {number}
 * @param [cbFn] {Function}
 * @returns {*|Base|Editable|Line}
 */
Line.prototype.newLineAfterCaret = function (caret, cbFn) {

  var nextIndex = this.getIndex() + 1;
  var nextText = this.cropText(caret, true);
  var nextChild = this.parent.insertBlankChild(nextIndex).getChild(nextIndex);

  nextChild.setDataText(nextText);

  if (!cbFn) {

    return nextChild;
  }
  cbFn();
  return this;
};

