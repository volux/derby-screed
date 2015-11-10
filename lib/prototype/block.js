// like a Element with children without own #text in DOM
/**
 *
 * @type {Unit|Base|*}
 */
var Unit = require('./unit');

/**
 *
 * @type {Block|Unit}
 */
module.exports = Block;

/**
 * @class Block
 */
function Block() {
}

/**
 *
 * @type {Unit.prototype}
 */
Block.prototype = Object.create(Unit.prototype);

Block.prototype.isBlock = true;

Block.prototype.create = function () {

  this.setDataAttributes();
  this.setNodeProps({
    contentEditable: false // TODO move to view as attribute
  });
  if (!this['$children']) {

    this['$children'] = [];
  }
};

/**
 *
 * @returns {Array}
 */
Block.prototype.getChildren = function () {

  return this['$children'];
};

/**
 *
 * @param index {number}
 * @returns {Base|Editable|Block}
 */
Block.prototype.getChild = function (index) {

  return this['$children'][index];
};

/**
 *
 * @returns {Editable}
 */
Block.prototype.getFirstChild = function () {

  return this['$children'][0];
};

/**
 *
 * @returns {Editable}
 */
Block.prototype.getLastChild = function () {

  return this['$children'][this['$children'].length - 1];
};

/**
 *
 * @returns {number}
 */
Block.prototype.getChildrenCount = function () {

  return this['$children'].length;
};

/**
 * find first editable via DOM
 * @returns {Editable|Unit|Base}
 */
Block.prototype.getFirstEditable = function () {

  return this.getElementComponent(this.getNode().querySelector('*[contenteditable=true]'));
};

/**
 * find last editable via DOM
 * @returns {Editable|Unit|Base}
 */
Block.prototype.getLastEditable = function () {

  var editables = this.getNode().querySelectorAll('*[contenteditable=true]');

  return this.getElementComponent(editables[editables.length - 1]);
};

/**
 *
 * @returns {boolean}
 */
Block.prototype.isContentIsListOrHeap = function () {

  return !!this.isContentType(['list', 'heap']);
};

/**
 *
 * @param index {number}
 * @param data {Array}
 * @param [cbFn] {Function}
 * @returns {Block}
 */
Block.prototype.insertChildren = function (index, data, cbFn) {

  if (this.isContentIsListOrHeap()) {

    this.model.insert('data', index, data, cbFn);
  }
  return this;
};

/**
 *
 * @param index {number|string}
 * @param [cbFn] {Function}
 * @returns {Block}
 */
Block.prototype.insertBlankChild = function (index, cbFn) {

  this.insertChildren(index, this.getChildrenBlankData(), cbFn);
  return this;
};

/**
 *
// * @param data {Object}
// * @param [cbFn] {Function}
// * @returns {Block}
 */
//Block.prototype.appendChild = function (data, cbFn) {
//
//  this.model.push('data', data, cbFn);
//
//  return this;
//};

/**
 *
 * @param data {Array}
 * @param [cbFn] {Function}
 * @returns {number} index where start appended data
 */
Block.prototype.appendChildren = function (data, cbFn) {

  var from = this.getChildrenCount();

  this.insertChildren(from, data, cbFn);

  return from;
};

/**
 *
 * @param index {number}
 * @param [howMany] {number}
 * @param [cbFn] {Function}
 * @returns {Array}
 */
Block.prototype.removeChildren = function (index, howMany, cbFn) {

  var children = this.getChildren();
  howMany = howMany || children.length - index;

  // TODO blur each lines from index to index+howMany
  //for () { // i from index to howMany
  // children[i].blur()
  //}
  return this.model.remove('data', index, howMany, cbFn);
};

/**
 *
 * @returns {Array|Object}
 */
Block.prototype.getDataCopy = function () {

  var wrapper = {};
  wrapper[this.getName()] = this.model.getDeepCopy('data');
  return wrapper;
};

/**
 *
 * @returns {Array|Object}
 */
Block.prototype.getChildrenDataCopy = function () {

  return this.model.getDeepCopy('data');
};

/**
 *
 * @returns {number|String|Array|Object}
 */
Block.prototype.getBlankData = function() {

  var wrapper = {};

  wrapper[this.getName()] = this.getChildrenBlankData();
  return wrapper;
};

/**
 *
 * @returns {number|String|Array|Object}
 */
Block.prototype.getChildrenBlankData = function() {

  return this.model.getDeepCopy('blank');
};

/**
 * Overwrite in custom block component
// * @param fromEl {Unit|Editable|Typed}
// * @returns {string}
// */
//Block.prototype.getPrevChildType = function (fromEl) {
//
//  return fromEl.getType();
//};

/**
 * Overwrite in custom block component
 * @param fromEl {Base|Unit|Editable|Typed}
 * @param [forEl] {Base|Unit|Editable|Typed}
 * @returns {string}
 */
Block.prototype.getNextChildType = function (fromEl, forEl) {

  if (fromEl.getType) {

    return fromEl.getType();
  }
  return '';
};

/**
 * Overwrite in custom block component
// * @param shiftFor {string} 'type' or 'text'
// * @param el {Editable}
 * @returns {Array}
 */
Block.prototype.getShiftList = function (/*shiftFor, el*/) {
  return [];
};

/**
 * Overwrite in custom block component
 * @param content {Array}
 * @returns {Array}
 */
Block.prototype.fillContentData = function (content) {

  return content;
};

/**
 *
 * @param [cbFn] {Function}
 * @returns {Object}
 */
Block.prototype.remove = function (cbFn) {

  if (this.parent.isContentType('heap')) {

    return this.parent.removeChildren(this.getIndex(), 1, cbFn);
  }
  return false;
};

/**
 * TODO Future method
 * @param otherBlock {Base|Unit|Block}
 * @param [cbFn] {Function}
 * @returns {boolean}
 */
Block.prototype.merge = function (otherBlock, cbFn) {

  if (this.getName() !== otherBlock.getName()) {

    return false;
  }

  var result = true;

  switch (this.getContentMerge()) {

    case 'child':
      // TODO see model.setDeepDiff in Derby docs
      // TODO use async for call cbFn after all .forEach
      this.getChildren().forEach(function (child, index) {

        if (result) {

          result = child.merge(otherBlock.getChild(index), cbFn);
        }
      });
      this.getDataAttributes().forEach(function (attribute) {

        if (result) {

          result = attribute.merge(otherBlock.getDataAttribute(attribute.getName()), cbFn);
        }
      });
      break;

    case 'same':
      // TODO append all and make unique with merge diff fields

      result = this.appendChildren(otherBlock.getChildrenDataCopy(), cbFn);

      break;

    case 'append':

      result = this.appendChildren(otherBlock.getChildrenDataCopy(), cbFn);
      break;
  }

  return result;
};

/**
 *
 * @param name {string}
 * @returns {Base|Unit|Editable|*}
 */
Block.prototype.getDataChild = function (name) {

  return _.find(this.getChildren(), {'dataName': name});
};

/**
 *
 * @returns {Block}
 */
Block.prototype.setDataAttributes = function () {

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
 *
 * @param attribute {Base|Attribute}
 */
Block.prototype.addDataAttribute = function (attribute) {

  var data = attribute.getData();

  this.model.set('attr.' + data.name, data.value.get());
  this.model.ref('attr.' + data.name, data.value);
};

/**
 * TODO use in template as-object="..." for attr, but how?!
 * @returns {Array}
 */
Block.prototype.getDataAttributes = function () {

  if (!this['$attributes']) {

    this['$attributes'] = [];
  }
  return this['$attributes'];
};

/**
 *
 * @param name {string}
 * @returns {Base|Attribute}
 */
Block.prototype.getDataAttribute = function (name) {

  return _.find(this.getDataAttributes(), {'dataName': name});
};

/**
 *
 * @param name {string}
 * @returns {null|Unit|Editable|Base|Attribute}
 */
Block.prototype.getDataChildOrAttribute = function (name) {

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
 *
 * @param name {string}
 * @param dir {number}
 * @returns {Block}
 */
Block.prototype.shiftData = function (name, dir) {

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
 *
 // * @param name {string}
 // * @returns {Block}
 */
//Block.prototype.toggleData = function (name) {
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
 * Future method
 * @returns {string}
 */
Block.prototype.toString = function () {

  var string = '';

  this.getChildren().forEach(function (child) {

    string+= child.toString();
  });
  return string;
};

