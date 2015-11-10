// like a Node in DOM
/**
 *
 * @type {Base}
 */
var Base = require('./base');
/**
 *
 * @type {_|lodash|exports|module.exports}
 */
var _ = require('lodash');

/**
 *
 * @type {Unit|Base}
 */
module.exports = Unit;

/**
 * @class Unit
 */
function Unit() {
}

/**
 *
 * @type {Base.prototype}
 */
Unit.prototype = Object.create(Base.prototype);

/**
 *
 * @param element {Element|Node}
 * @returns {Unit|Base}
 */
Unit.prototype.getElementComponent = function (element) {

  if (!element) return null;
  return this.getComponentById(element['id']);
};

/**
 *
 * @param id
 * @returns {Unit|Base}
 */
Unit.prototype.getComponentById = function (id) {

  return this.page._components[id];
};

/**
 *
 * @returns {Number}
 */
Unit.prototype.getIndex = function () {

  return parseInt(this.getAttribute('i'));
};

/**
 *
 * @returns {Selection|rangy.selectionPrototype|*} WrappedSelection
 */
Unit.prototype.getSelection = function () {

  return this.app.proto.rangy['getSelection']();
};

/**
 *
 * @returns {Array}
 */
Unit.prototype.getComponentsPathSegments = function () {

  var segments = this.parent.getComponentsPathSegments();

  segments.push('$children');
  segments.push(this.getAttribute('i'));

  return segments;
};

/**
 *
 * @returns {Array}
 */
Unit.prototype.getDataPathSegments = function () {

  var segments = this.parent.getDataPathSegments();

  if (this.parent.isContentIsListOrHeap()) {

    segments.push(this.getAttribute('i'));
  }
  segments.push(this.model.get('scheme.name'));

  return segments;
};

/**
 *
 * @returns {Element|Node}
 */
Unit.prototype.getNode = function () {

  return this['$node'];
};

/**
 *
 * @returns {boolean}
 */
Unit.prototype.isVisible = function () {

  var node = this.getNode();

  if (!node) {

    return false;
  }
  return this.getNode().offsetHeight > 0
};

/**
 *
 * @param props {Object}
 * @returns {Unit}
 */
Unit.prototype.setNodeProps = function (props) {

  var node = this.getNode();

  if (!node) {

    return this;
  }
  for (var prop in props) if (props.hasOwnProperty(prop)) {

    node[prop] = props[prop];
  }
  return this;
};

/**
 *
 * @param list {Object}
 * @returns {Unit}
 */
Unit.prototype.listenDomEvents = function (list) {

  var node = this.getNode();

  for (var domEvent in list) if (list.hasOwnProperty(domEvent)) {

    this.dom.on(domEvent, node, list[domEvent].bind(this), false);
  }
  return this;
};

/**
 *
 * @returns {Base|Unit|*}
 */
Unit.prototype.getPrevComponent = function () {

  return this.parent.getChild(this.getIndex() - 1);
};

/**
 *
 * @returns {Base|Unit|*}
 */
Unit.prototype.getNextComponent = function () {

  return this.parent.getChild(this.getIndex() + 1);
};

/**
 *
 * @param data {Array}
 * @param [cbFn] {Function}
 * @returns {Base|Unit|*}
 */
Unit.prototype.before = function (data, cbFn) {

  var index = this.getIndex();

  this.parent.insertChildren(index, data, cbFn);

  if (!cbFn) {

    return this.parent.getChild(index);
  }
  return this;
};

/**
 *
 * @param data {Array}
 * @param [cbFn] {Function}
 * @returns {Base|Unit|*}
 */
Unit.prototype.after = function (data, cbFn) {

  var nextIndex = this.getIndex() + 1;

  this.parent.insertChildren(nextIndex, data, cbFn);

  if (!cbFn) {

    return this.parent.getChild(nextIndex);
  }
  return this;
};

/**
 *
 * @param toIndex {number}
 * @param [cbFn] {Function}
 * @returns {Base|Unit|*}
 */
Unit.prototype.move = function (toIndex, cbFn) {

  var removed = this.remove();

  if (!removed) {

    return this;
  }
  // this.model.move do not work %(
  this.parent.insertChildren(toIndex, removed, cbFn);

  if (!cbFn) {

    return this.parent.getChild(toIndex);
  }
  return this;
};


