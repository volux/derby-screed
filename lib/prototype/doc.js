// like a #document in DOM

// TODO return data for undo/redo for parent
/**
 *
 * @type {Block|Unit|Base|*}
 */
var Block = require('./block');
//var _ = require('lodash');
/**
 *
 * @type {EventContext|*}
 */
var EventContext = require('../event-context');

/**
 *
 * @type {Doc|Block}
 */
module.exports = Doc;

/**
 * @class Doc
 */
function Doc() {
}

/**
 *
 * @type {Block.prototype}
 */
Doc.prototype = Object.create(Block.prototype);

Doc.prototype.init = function () {

  //console.log(this.getName(), this.getRole());

  this.inFocus(false);
  // show|hide sections like cover or intro
  // TODO move to custom doc
  this.model.set('expand', true);

};

Doc.prototype.create = function () {

  // TODO move to template (locked feature)
  this.setNodeProps({
    contentEditable: true
  });

  this.app.proto.keyboard.component(this);

  this.keyboard.prevent('$node', [
    'mod+b',
    'mod+u',
    'mod+i'
  ]);
  this.setShortcuts();
  this.keyboard.element('$node', this.shortcuts);

  this.listenDomEvents(this.domEvents);
};

/**
 * Overwrite in component
 */
Doc.prototype.setShortcuts = function () {

  this.shortcuts = {};
};

/**
 *
 * @param name {string}
 * @returns {Array}
 */
Doc.prototype.getLookupList = function(name) {

  return this.model.get('lookup.' + name);
};

/**
 *
 * @param name {string}
 * @param items {Array}
 * @param [cbFn] {Function}
 * @returns {*}
 */
Doc.prototype.setLookupList = function(name, items, cbFn) {

  return this.model.set('lookup.' + name, items, cbFn);
};

/**
 *
 * @param name {string}
 * @param item {string}
 * @param [cbFn] {Function}
 * @returns {*|Number}
 */
Doc.prototype.appendLookupList = function(name, item, cbFn) {

  return this.model.push('lookup.' + name, item, cbFn);
};

/**
 *
 * @param event
 * @param [cbFn] {Function}
 * @returns {Doc}
 */
Doc.prototype.saveLookup = function (event, cbFn) {

  var context = event.context;

  if (!context || !context.el || !context.el.isContentLookup()) {

    return this;
  }

  var elName = context.el.getName();
  var lookup = this.getLookupList(elName);

  if (!lookup) {

    lookup = ['?'];
    this.setLookupList(elName, lookup);
  }

  var text = context.el.getDataText();

  if (text.length > 0) {

    if (lookup.indexOf(text) > -1) {

      return this;
    }
    this.appendLookupList(elName, text, cbFn);
  }
  return this;
};

/**
 *
 * @returns {Array}
 */
Doc.prototype.getComponentsPathSegments = function () {

  var segments = this.parent.getComponentsPathSegments();

  segments.push('$doc');

  return segments;
};

/**
 *
 * @returns {Array}
 */
Doc.prototype.getDataPathSegments = function () {

  var segments = this.parent.getDataPathSegments();

  segments.push(this.model.get('scheme.role'));

  return segments;
};

/**
 *
 * @param context {EventContext}
 * @param [usePath=false] {boolean}
 * @returns {{el:{Editable}|path:{string}, start:{number}, end:{number}}[]}
 */
Doc.prototype.getEditablesInContext = function (context, usePath) {

  var editables = [];

  if (!context.selection) {

    return editables;
  }

  var selection = function (el, start, end) {

    var selection = {
      start: start,
      end: end
    };

    if (usePath) {

      selection.path = el.getComponentsPathSegments().join('.');

    } else {

      selection.el = el;
    }
    return selection;
  };

  if (context.selection.rangeCount === 0 || context.el.getDataText() === '') {

    editables.push(selection(context.el, 0, 0));
    return editables;
  }

  var range = context.selection.range(0);
  var elements = context.selection.getElementsInRange(range);
  var start = 0;
  var end = 0;
  var firstIndex = 0;
  var lastIndex = elements.length - 1;

  elements.forEach(function (element, i) {

    var component = this.getElementComponent(element);

    if (!component && !component.isEditable()) {

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

    editables.push(selection(component, start, end));

  }.bind(this));

  return editables;
};

/**
 *
 * @param editables {Array}
 * @param forward {boolean}
 * @param [cbFn] {Function}
 * @returns {Editable}
 */
Doc.prototype.removeSelectedEditables = function (editables, forward, cbFn) {

  var firstIndex = 0;
  var lastIndex = editables.length - 1;
  var text = '';
  var returnEl = editables[0].el;

  editables.forEach(function (item, i) {

    if (!item.el.isContentInput()) {

      return;
    }
    text = item.el.getDataText();
    text = text.substring(0, item.start) + text.substring(item.end);
    if (text.length === 0 && i !== firstIndex && !item.el.remove()) {

      text = item.el.getPlaceholder();
    }
    item.el.setDataText(text);
    if (i === lastIndex) {
      if (editables[firstIndex].el.getType && item.el.setType) {
        if (item.el.getIndex() !== 0 && i !== firstIndex) {

          item.el.setType(item.el.parent.getNextChildType(editables[firstIndex].el, item.el));
        }
      }
      if (forward) {

        returnEl = item.el;
      }
    }
  }.bind(this));

  if (cbFn) {

    cbFn(returnEl);
  }
  return returnEl;
};

/**
 *
 * @param component {Editable}
 * @param action {string}
 * @returns {Doc}
 */
Doc.prototype.fireActionOn = function (component, action) {

  var actionFn = this.shortcuts[action]['action'].bind(this);
  actionFn({context: new EventContext(component)});

  return this;
};

/**
 *
 * @param state {boolean}
 * @returns {Doc}
 */
Doc.prototype.inFocus = function (state) {

  this.model.set('focus', state);
  return this;
};

Doc.prototype.domEvents = {

  'focusin': function () {

    this.inFocus(true);
  },

  'focusout': function (event) {

    this.saveLookup(event);
    this.inFocus(false);
  }

};

