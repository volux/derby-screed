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

  this.model.setNull('scroll', 0);
  this.inFocus(false);

  this.on('destroy', this.clearLocalCursorData.bind(this));

  if (this.getAttribute('debug')) {

    //this.model.set('cursors', {empty: true});

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
 * use it, if inside editables wrapper is scrollable
 * @param scroll {number}
 */
Screed.prototype.setScroll = function (scroll) {

  this.model.set('scroll', scroll);
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
 * @returns {string}
 */
Screed.prototype.getUserId = function () {

  return this.model.get('userId'); // or this.model.root.get('_session.userId')
};

/**
 *
 * @param selected {{path:{string}, start:{number}, end:{number}}[]}
 * @returns {Screed}
 */
Screed.prototype.setLocalCursorData = function (selected) {

  if (!selected.length) {

    return this;
  }
  var userId = this.getUserId();
  var cursor = {
    userId: userId,
    selected: selected
  };
  this.model.set('cursors.' + userId, cursor);

  return this;
};

/**
 *
 */
Screed.prototype.clearLocalCursorData = function () {

  this.model.del('cursors.' + this.getUserId());
};

/**
 *
 * @param context {EventContext}
 */
Screed.prototype.setPosition = function (context) {

  if (context && context.el && context.selection) {


    this.model.set('position', {
      section: context.el.getSection().getIndex(), // TODO .getSection() call always - move to EventContext
      // TODO get total previous line count for non table data
      line:  context.el.getIndex(),
      cursor: context.selection.focusOffset,
      path: context.el.getDataPathSegments().join('.'),
      // Editable path - needed to return focus to Editable after
      // toolbar/menu action (with lose focus)
      // and for app info panel
      current: context.el.getComponentsPathSegments().join('.')
    });

    this.setLocalCursorData(context.selected);
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
