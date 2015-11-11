// like a Element with #text in DOM
// data: {text: ''}
/**
 *
 * @type {Unit}
 */
var Unit = require('./unit');
/**
 *
 * @type {_|lodash|exports|module.exports}
 */
var _ = require('lodash');
/**
 *
 * @type {EventContext|*}
 */
var EventContext = require('../event-context');
/**
 *
 * @type {Editable|Unit}
 */
module.exports = Editable;

/**
 * @class Editable
 */
function Editable() {
}

/**
 *
 * @type {Unit.prototype}
 */
Editable.prototype = Object.create(Unit.prototype);

/**
 *
 * @type {string[]}
 */
Editable.prototype.isEditable = true;

Editable.prototype.init = function () {

  this.inFocus(false);
  this.model.on('change', 'data**', this.onChange.bind(this));
};

Editable.prototype.create = function () {

  this.setNodeProps({
    contentEditable: true // TODO move to view as attribute {{!locked}}
  });

  this.listenDomEvents(this.domEvents);
};

/**
 *
 * @returns {boolean}
 */
Editable.prototype.isEventContext = function () {

  return true;
};

/**
 *
 * @returns {Editable}
 */
Editable.prototype.focus = function () {

  this.getNode().focus();
  return this;
};

/**
 *
 * @returns {Editable}
 */
Editable.prototype.blur = function () {

  this.getNode().blur();
  return this;
};

/**
 * Used DOM structure
 * @returns {null|Editable}
 */
Editable.prototype.getPrevBlockEditable = function () {

  var prevEditable = null;
  var prevDomBlock = this.parent.getNode().previousElementSibling;

  if (prevDomBlock) {

    var prevBlockComponent = this.getElementComponent(prevDomBlock);
    var blockContentType = prevBlockComponent.getContentType();

    if (blockContentType === 'list') {

      prevEditable = prevBlockComponent.getLastChild();

    } else
    if (blockContentType === 'form') {

      if (this.parent.isContentType('list')) {

        prevEditable = prevBlockComponent.getLastChild();

      } else {

        prevEditable = prevBlockComponent.getChild(this.getIndex());
      }
    }
  }
  return prevEditable;
};

/**
 * Used DOM structure
 * @returns {null|Editable}
 */
Editable.prototype.getNextBlockEditable = function () {

  var nextEditable = null;
  var nextDomBlock = this.parent.getNode().nextElementSibling;

  if (nextDomBlock) {

    var nextBlockComponent = this.getElementComponent(nextDomBlock);
    var blockContentType = nextBlockComponent.getContentType();

    if (blockContentType === 'list') {

      nextEditable = nextBlockComponent.getFirstChild();
    } else
    if (blockContentType === 'form') {

      if (this.parent.isContentType('list')) {

        nextEditable = nextBlockComponent.getFirstChild();

      } else {

        nextEditable = nextBlockComponent.getChild(this.getIndex());
      }
    }
  }
  return nextEditable;
};

/**
 *
 * @returns {null|Base|Unit|Editable}
 */
Editable.prototype.getPrevEditable = function () {

  var prevEditable = this.getPrevComponent();

  if (!prevEditable) {

    prevEditable = this.getPrevBlockEditable();
  }
  if (!prevEditable || !prevEditable.isEditable) {

    return null;
  }
  return prevEditable;
};

/**
 *
 * @returns {null|Base|Unit|Editable}
 */
Editable.prototype.getNextEditable = function () {

  var nextEditable = this.getNextComponent();

  if (!nextEditable) {

    nextEditable = this.getNextBlockEditable();
  }
  if (!nextEditable || !nextEditable.isEditable) {

    return null;
  }
  return nextEditable;
};

/**
 *
 * @returns {null|Base|Unit|Editable}
 */
Editable.prototype.prevEditableFocus = function () {

  var prevEditable = this.getPrevEditable();

  if (prevEditable && prevEditable.isVisible()) {

    prevEditable.moveCursorTo('end');
  }
  return prevEditable;
};

/**
 *
 * @returns {null|Base|Unit|Editable}
 */
Editable.prototype.nextEditableFocus = function () {

  var nextEditable = this.getNextEditable();

  if (nextEditable && nextEditable.isVisible()) {

    nextEditable.moveCursorTo(0)
  }
  return nextEditable;
};

/**
 * TODO move to Block
 * @returns {boolean}
 */
Editable.prototype.prependBlankChildInNextBlock = function () {

  var nextBlock = this.parent.getNextComponent();

  if (nextBlock) {

    nextBlock.insertBlankChild(0, function() {

      nextBlock.getFirstChild().moveCursorTo(0);
    });
    return true;
  }
  return false;
};

/**
 * TODO think about merge scheme
 * @returns {boolean}
 */
Editable.prototype.glueWithPrevious = function () {

  return false;
};

/**
 * TODO think about merge scheme
 * @returns {boolean}
 */
Editable.prototype.glueWithNext = function () {

  return false;
};

/**
 *
 * @returns {string}
 */
Editable.prototype.getDataText = function () {

  var text = this.getData();

  if (!text || text === this.getPlaceholder()) {

    return '';
  }
  return text;
};

/**
 * Taken from https://github.com/derbyjs/racer-examples/blob/master/pad/client.js
 * @param value {string}
 * @param [onlyData=false] {boolean}
 * @param [cbFn] {Function}
 * @returns {Editable}
 */
Editable.prototype.setDataText = function (value, onlyData, cbFn) {

  var previous = this.getData() || '';

  if (value === previous) {

    if (cbFn) {
      cbFn();
    }
    return this;
  }

  var start = 0;

  while (previous.charAt(start) == value.charAt(start)) {
    start++;
  }

  var end = 0;

  while (
  previous.charAt(previous.length - 1 - end) === value.charAt(value.length - 1 - end) &&
  end + start < previous.length &&
  end + start < value.length
    ) {
    end++;
  }

  cbFn = cbFn || function (err) {if (err) {console.error(err);}};

  if (previous.length !== start + end) {

    var howMany = previous.length - start - end;

    this.scope().stringRemove(start, howMany, cbFn);
  }
  if (value.length !== start + end) {

    var inserted = value.slice(start, value.length - end);

    this.scope().stringInsert(start, inserted, cbFn);
  }

  if (!onlyData) {

    this.setNodeContent(value);
  }

  return this;
};

/**
 * TODO Future method
 * @param otherEditable {Editable}
 * @param [cbFn] {Function}
 * @returns {boolean}
 */
Editable.prototype.merge = function (otherEditable, cbFn) {

  switch (this.getContentMerge()) {

    case 'concat':
      this.setDataText(this.getDataText() + otherEditable.getDataText(), false, cbFn);
      break;
  }
  return true;
};

/**
 *
 * @param cursor {number|{startOffset: number, endOffset: number}}
 * @param forward {boolean}
 * @param [cbFn] {Function}
 * @returns {string}
 */
Editable.prototype.cropText = function (cursor, forward, cbFn) {

  var start = cursor;
  var end = cursor;
  var text = this.getDataText();

  if (_.isObject(cursor)) {

    start = cursor.startOffset;
    end = cursor.endOffset;
  }

  if (forward) {

    this.setDataText(text.substring(0, start), false, cbFn);
    return text.substring(end) || this.getPlaceholder();

  }
  this.setDataText(text.substring(end), false, cbFn);
  return text.substring(0, start) || this.getPlaceholder();
};

/**
 *
 * @param [node] {Element|Node}
 * @returns {null|Text|Node}
 */
Editable.prototype.getTextNode = function (node) {

  node = node || this.getNode();

  if (!node) {

    return null;
  }
  if (node.childNodes.length === 0) {

    return null;
  }
  if (node.childNodes.length > 1) {

    node.normalize();

  }

  var textNode = node.firstChild;

  if (textNode.nodeType === 3) {

    return textNode;
  }

  return null;
};

/**
 *
 * @param cursorPosition {number|string}
 * @returns {Editable}
 */
Editable.prototype.moveCursorTo = function (cursorPosition) {

  if (!cursorPosition) {

    this.focus();
    return this;
  }

  /**
   *
   * @type {Node|Text|null}
   */
  var text = this.getTextNode();

  if (!text) {

    this.focus();
    return this;
  }
  if (cursorPosition === 'end') {

    cursorPosition = text.length;
  }
  this.getSelection().moveCursorTo(text, Math.min(cursorPosition, text.length));

  return this;
};

/**
 *
 * @param [cbFn] {Function}
 * @returns {Editable}
 */
Editable.prototype.normalizeText = function (cbFn) {

  if (this.model.get('scheme.content.keepSpaces')) {

    return this;
  }
  var text = this.getDataText();
  var normalText = text.replace(/\s+/g, " ").trim() || this.getPlaceholder();

  // TODO detect multi line (.split('\n').length > 1) (stop! - it's paste functional)
  // TODO and append after siblings with they lines (stop! - it's paste functional)
  if (text !== normalText) {

    this.setDataText(normalText, false, cbFn);
  }

  return this;
};

/**
 *
 * @returns {string}
 */
Editable.prototype.getSection = function () {

  if (this.$section) {

    return this.$section;
  }
  var self = this;
  var section = this;
  var parent = function (el) {

    var parent = el.parent;

    if (!parent) {

      return null;
    }
    if (parent.isSection) {

      self.$section = parent;
      return null;
    }
    return parent;
  };

  while ((section = parent(section))) {}

  return this.$section;
};

/**
 * if node.contentEditable === true then nodeValue is null
 * @returns {string}
 */
Editable.prototype.getNodeContent = function () {

  return this.getNode().textContent;
};

/**
 *
 * @param text {string}
 * @param [cbFn] {Function} transformCursors
 * @returns {Editable}
 */
Editable.prototype.setNodeContent = function (text, cbFn) {

  // exactly .textContent, not .innerHtml, not .nodeValue
  this.getNode().textContent = text;
  if (cbFn) {
    cbFn();
  }
  return this;
};

/**
 * Taken idea from https://github.com/derbyjs/racer-examples/blob/master/pad/client.js
 */
Editable.prototype.onInput = function () {

  this.setDataText(this.getNodeContent(), true);
};

/**
 * Taken idea from https://github.com/derbyjs/racer-examples/blob/master/pad/client.js
 * @param path {string}
 * @param value {string}
 * @param previous {string}
 * @param passed {*}
 */
Editable.prototype.onChange = function(path, value, previous, passed) {

  if (!passed['$remote'] && this.model.get('focus')) {

    return;
  }
  if (path === 'type') { // smell, Typed is custom editable

    return;
  }
  if (_.isObject(value)) {

    value = value['text'];
  }
  if (_.isObject(previous)) {

    previous = previous['text'];
  }

  var insert = passed['$stringInsert'];
  var remove = passed['$stringRemove'];
  var transformCursor = function (cursor) {

    return Math.min(value.length, cursor);
  };
  var newText = value;
  var index;

  if (insert) {

    var text = insert['text'];

    index = insert['index'];
    transformCursor = function (cursor) {

      return (index < cursor) ? cursor + text.length : cursor;
    };
    newText = previous.slice(0, index) + text + previous.slice(index);

  } else
  if (remove) {

    var howMany = remove['howMany'];

    index = remove['index'];
    transformCursor = function (cursor) {

      return (index < cursor) ? Math.max(index, cursor - howMany) : cursor;
    };
    newText = previous.slice(0, index) + previous.slice(index + howMany);

  }
  this.replaceNodeContent(newText, transformCursor);

};

/**
 * Taken idea from https://github.com/derbyjs/racer-examples/blob/master/pad/client.js
 * @param newText {string}
 * @param [transformCursor] {Function}
 */
Editable.prototype.replaceNodeContent = function (newText, transformCursor) {

  if (!this.isInFocus()) {

    this.setNodeContent(newText);
    return;
  }
  var element = this.getNode();
  var selection = this.getSelection();
  var state = selection.getStateBeforeReplaceText(element);

  this.setNodeContent(newText);

  selection.setStateAfterReplaceText(state, transformCursor);
};

Editable.prototype.normalizeNodeContent = function () {

  var element = this.getNode();

  if (!this.isInFocus()) {

    element.normalize();
    return;
  }

  var selection = this.getSelection();
  var state = selection.getStateBeforeReplaceText(element);

  element.normalize();

  selection.setStateAfterReplaceText(state);
};

/**
 * Future method
 * @returns {string}
 */
Editable.prototype.toString = function () {

  return this.getDataText();
};

/**
 * for overwrite in components
 */
Editable.prototype.onClick = function () {

};

/**
 *
 * @param selection {Selection|rangy.selectionPrototype}
 * @returns {{el:{Editable}|path:{string}, start:{number}, end:{number}}[]}
 */
Editable.prototype.getSelectedEditables = function (selection) {

  var editables = [];

  if (!selection) {

    return editables;
  }

  var _selection = function (el, start, end) {

    return {
      start: start,
      end: end,
      path: el.getComponentsPathSegments().join('.')
    };
  };

  if (selection.rangeCount === 0 || this.getDataText() === '') {

    editables.push(_selection(this, 0, 0));
    return editables;
  }

  var range = selection.range(0);
  var elements = selection.getElementsInRange(range);
  var start = 0;
  var end = 0;
  var firstIndex = 0;
  var lastIndex = elements.length - 1;

  elements.forEach(function (element, i) {

    var component = this.getElementComponent(element);

    if (!component || !component.isEditable) {

      firstIndex++;
      return;
    }
    if (firstIndex === i) {

      start = range.startOffset;

    } else {

      start = 0
    }
    if (lastIndex === i || lastIndex === firstIndex) {

      end = range.endOffset;

    } else {

      end = element.textContent.length;
    }

    editables.push(_selection(component, start, end));

  }.bind(this));

  return editables;
};

Editable.prototype.inFocus = function (state) {

  this.model.set('focus', state);
};

/**
 *
 * @returns {boolean}
 */
Editable.prototype.isInFocus = function () {

  return this.model.get('focus');
};

/**
 * DOM events
 * @type {{keydown: Function, keyup: Function, focusin: Function, focusout: Function, input: Function, mouseup: Function, touchend: Function}}
 */
Editable.prototype.domEvents = {

  'keydown': function (event) {

    event.context = new EventContext(this);
  },

  'keyup': function (event) {

    event.context = new EventContext(this);
  },

  'focusin': function (event) {

    event.context = new EventContext(this);

    this.inFocus(true);
    if (this.getNodeContent() === this.getPlaceholder()) {

      this.setNodeContent('');
    }
  },

  'focusout': function (event) {

    event.context = new EventContext(this);

    this.inFocus(false);
    if (!this.isContentInput()) {

      return true;
    }
    this.normalizeText();

    return true;
  },

  'input': function (event) {

    event.context = new EventContext(this);

    if (!this.isContentInput()) {

      var cursorPosition = event.context.selection.focusOffset;
      // return previous value
      this.setNodeContent(this.getDataText()); // TODO use .replaceNodeContent(), test
      // move cursor position naturally
      this.moveCursorTo(cursorPosition);

      return false;
    }
    setTimeout(this.onInput.bind(this), 0);
    return true;
  },

  'mouseup': function (event) {

    event.context = new EventContext(this);
  },

  'click': function (event) {

    event.context = new EventContext(this);
    this.onClick(event);
  },

  'touchend': function (event) {

    event.context = new EventContext(this);
  },

  'cut': function (event) {

    event.preventDefault();
    event.context = new EventContext(this);
    //return false;
  },

  'copy': function (event) {

    event.preventDefault();
    event.context = new EventContext(this);
    //return false;
  },

  'paste': function (event) {

    event.preventDefault();
    event.context = new EventContext(this);
    //return false;
  }

};
