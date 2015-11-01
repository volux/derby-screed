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
 * @returns {Base}
 */
Unit.prototype.getElementComponent = function (element) {

  return this.getComponentById(element['id']);
};

/**
 *
 * @param id
 * @returns {Base}
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
 * @returns {Selection|*} WrappedSelection
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
Unit.prototype.isEditable = function () {

  return false;
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
 * TODO move to Block
 * @param name {string}
 * @returns {Unit}
 */
Unit.prototype.getDataChild = function (name) {

  return _.find(this.getChildren(), {'dataName': name});
};

/**
 * TODO move to Block
 * @returns {Unit}
 */
Unit.prototype.setDataAttributes = function () {

  var setNodeDataAttribute = function (node, key, value) {

    if (node) {

      node.dataset[key] = value;
    }
  };
  var attributes = this.model.get('attr');

  if (attributes) {

    var node = this.getNode();
    for (var attribute in attributes) if (attributes.hasOwnProperty(attribute)) {

      setNodeDataAttribute(node, attribute, attributes[attribute]);
    }
  }
  this.model.on('change', 'attr**', function (path, value) {

    setNodeDataAttribute(this.getNode(), path, value);
  }.bind(this));

  return this;
};

/**
 * TODO move to Block
 * @param attribute {Attribute}
 */
Unit.prototype.addDataAttribute = function (attribute) {

  var data = attribute.getData();

  this.model.set('attr.' + data.name, data.value.get());
  this.model.ref('attr.' + data.name, data.value);
};

/**
 * TODO move to Block
 * @returns {Array}
 */
Unit.prototype.getDataAttributes = function () {

  if (!this['$attributes']) {

    this['$attributes'] = [];
  }
  return this['$attributes'];
};

/**
 * TODO move to Block
 * @param name {string}
 * @returns {Cursors}
 */
Unit.prototype.getDataAttribute = function (name) {

  return _.find(this.getDataAttributes(), {'dataName': name});
};

/**
 * TODO move to Block
 * @param name {string}
 * @returns {Unit|Cursors}
 */
Unit.prototype.getDataChildOrAttribute = function (name) {

  var el = null;
  var dataItem = _.find(this.model.get('scheme.content.items'), {'name': name});

  if (dataItem) {

    if (dataItem['role'] === 'attr') {

      el = this.getDataAttribute(name);

    } else {

      el = this.getDataChild(name);
    }
  }
  return el;
};

/**
 * TODO move to Block
 * @param name {string}
 * @param dir {number}
 * @returns {Unit}
 */
Unit.prototype.shiftData = function (name, dir) {

  var el = this.getDataChildOrAttribute(name);

  if (el) {

    el.shift(dir);

  } else {

    // default as positive (>0) spinner
    var path = 'data.' + name;
    var value = this.model.get(path);

    if (value === null) {

      value = 0;
      this.model.set(path, value);
    }
    if (value === 0 && dir < 0) {

      return this;
    }
    if (_.isNumber(value)) {

      this.model.increment(path, dir);
    }
  }
  return this;
};

/**
 * TODO move to Block
// * @param name {string}
// * @returns {Unit}
 */
//Unit.prototype.toggleData = function (name) {
//
//  var el = this.getDataChildOrAttribute(name);
//
//  if (el) {
//
//    el.toggle();
//
//  } else {
//
//    // default as boolean toggler
//    var path = 'data.' + name;
//
//    this.model.set(path, !this.model.get(path));
//  }
//
//  return this;
//};

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


