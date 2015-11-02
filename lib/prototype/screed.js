//like the window in DOM
/**
 *
 * @type {_|lodash|exports|module.exports}
 */
var _ = require('lodash');
/**
 *
 * @type {Screed}
 */
module.exports = Screed;

/**
 * @class Screed
 */
function Screed() {
}

Screed.prototype.init = function () {

  this.inFocus(false);
  if (this.getAttribute('debug')) {

    var changed = function () {

      this.model.set('json', JSON.stringify(this.model.get('data'), null, 2));
    }.bind(this);

    changed();
    this.model.on('all', 'data.**', changed);
  }

};

Screed.prototype.create = function () {

  this.listenDomEvents(this.domEvents);

  if (this.getAttribute('debug')) {
    console.log(this);
  }
};

/**
 *
 * @returns {Element|Node}
 */
Screed.prototype.getNode = function () {

  return this['$node'];
};

/**
 *
 * @param editables {{el:{Editable}, start:{number}, end:{number}}[]}
 * @returns {Screed}
 */
Screed.prototype.setLocalCursorData = function (editables) {

  if (!editables.length) {

    return this;
  }
  var userId = this.model.get('userId');
  var cursor = {
    userId: userId,
    selected: editables
  };
  this.model.set('cursors.' + userId, cursor);

  return this;
};

/**
 *
 */
Screed.prototype.clearLocalCursorData = function () {

  var userId = this.model.get('userId');
  this.model.del('cursors.' + userId);
};

/**
 *
 * @param context {EventContext}
 */
Screed.prototype.setPosition = function (context) {

  if (context && context.el && context.selection) {


    this.model.set('position', {
      section: context.el.getSection().getIndex(),
      // TODO get total previous line count for non table data
      line:  context.el.getIndex(),
      cursor: context.selection.focusOffset,
      path: context.el.getDataPathSegments().join('.'),
      // Editable path - needed to return focus to Editable after
      // toolbar/menu action (with lose focus)
      // and for app info panel
      current: context.el.getComponentsPathSegments().join('.')
    });

    this.setLocalCursorData(this['$doc'].getEditablesInContext(context, true));
  }
};

/**
 *
 * @param path {string}
 * @returns {Editable|Unit|Base|*}
 */
Screed.prototype.getComponentByPath = function (path) {

  return _.get(this, path);
};

/**
 *
 * @returns {{path: string, cursor: number}}
 */
Screed.prototype.getCurrentEditableData = function () {

  return {
    path: this.model.get('position.current'),
    cursor: this.model.get('position.cursor')
  };
};

/**
 *
 * @returns {Array}
 */
Screed.prototype.getComponentsPathSegments = function () {

  return [];
};

/**
 *
 * @returns {Array}
 */
Screed.prototype.getDataPathSegments = function () {

  //return [this.model.get('data.id')];
  return [];
};

/**
 *
 * @param state {boolean}
 * @returns {Screed}
 */
Screed.prototype.inFocus = function (state) {

  this.model.set('focus', state);

  return this;
};

/**
 *
 * @param list {Object}
 * @returns {Screed}
 */
Screed.prototype.listenDomEvents = function (list) {

  var node = this.getNode();

  for (var domEvent in list) if (list.hasOwnProperty(domEvent)) {

    this.dom.on(domEvent, node, list[domEvent].bind(this), false);
  }
  return this;
};

Screed.prototype.domEvents = {

  'focusin': function (event) {

    this.setPosition(event.context);
    this.inFocus(true);
  },

  'focusout': function () {

    this.inFocus(false);

    //setTimeout(this.clearLocalCursorData.bind(this), 0); // flicked cursors
    this.clearLocalCursorData();
    // TODO set this.id to this.page.$lastScreed (or to '_session.lastScreed') for return focus
  },

  'keyup': function (event) {

    this.setPosition(event.context);
  },

  'input': function (event) {

    this.setPosition(event.context);
  },

  'mouseup': function (event) {

    this.setPosition(event.context);
  },

  'touchend': function (event) {

    this.setPosition(event.context);
  }
};
