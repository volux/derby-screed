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

  this.inFocus(false);
  // show|hide sections like cover or intro
  // TODO move to custom doc
  this.model.set('expand', true);

};

Doc.prototype.create = function () {

  //console.log(this.getName(), this.getRole());

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
 * @param selected {{path: string, start: number, end: number}[]}
 * @param forward {boolean}
 * @param [cbFn] {Function}
 * @returns {Editable}
 */
Doc.prototype.removeSelectedEditables = function (selected, forward, cbFn) {

  var firstIndex = 0;
  var lastIndex = selected.length - 1;
  var text = '';
  var returnEl = this.parent.getComponentByPath(selected[0].path);

  selected.forEach(function (item, i) {

    var el = this.parent.getComponentByPath(item.path);

    if (!el || !el.isContentInput()) {

      firstIndex++;
      return;
    }
    text = el.getDataText();
    text = text.substring(0, item.start) + text.substring(item.end);
    if (text.length === 0 && i !== firstIndex && !el.remove()) {

      text = el.getPlaceholder();
    }
    el.setDataText(text);
    if (i === lastIndex) {

      var firstEl = this.parent.getComponentByPath(selected[firstIndex].path);

      if (firstEl.getType && el.setType) {
        if (el.getIndex() !== 0 && i !== firstIndex) {

          el.setType(el.parent.getNextChildType(firstEl, el));
        }
      }
      if (forward) {

        returnEl = el;
      }
    }
  }.bind(this));

  if (cbFn) {

    setTimeout(function () {
      cbFn(returnEl);
    }, 0);
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

/**
 * overwrite in component
 */
Doc.prototype.onScroll = function () {

};

Doc.prototype.domEvents = {

  'focusin': function () {

    this.inFocus(true);
  },

  'focusout': function (event) {

    this.saveLookup(event);
    this.inFocus(false);
  },

  'scroll': function (event) {

    this.onScroll(event);
  },

  'cut': function (event) {

    console.log(event.context);
    //screed.select.event(event).cut();
    return false;
  },

  'copy': function (event) {

    console.log(event.context);
    //screed.select.event(event).copy();
    return false;
  },

  'paste': function (event) {

    console.log(event.context);
    //screed.select.event(event).paste();
    return false;
  }

};

