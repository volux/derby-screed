/**
 *
 * @type {Block|Unit|Base|*}
 */
var Block = require('./block');

/**
 *
 * @type {Area|Block}
 */
module.exports = Area;

/**
 * @class Area
 */
function Area() {
}

/**
 *
 * @type {Block.prototype}
 */
Area.prototype = Object.create(Block.prototype);

Area.prototype.init = function () {

  this.inFocus(false);
};

Area.prototype.create = function () {

  //console.log(this.getName(), this.getRole());

  this.listenDomEvents(this.domEvents);
};

/**
 *
 * @returns {Array}
 */
Area.prototype.getComponentsPathSegments = function () {

  var segments = this.parent.getComponentsPathSegments();

  segments.push('$doc');

  return segments;
};

/**
 *
 * @param state {boolean}
 * @returns {Area}
 */
Area.prototype.inFocus = function (state) {

  this.model.set('focus', state);
  return this;
};

/**
 * overwrite in component
 */
Area.prototype.onScroll = function () {

};

Area.prototype.domEvents = {

  'focusin': function () {

    this.inFocus(true);
  },

  'focusout': function () {

    this.inFocus(false);
  },

  'scroll': function (event) {

    this.onScroll(event);
  }

};

