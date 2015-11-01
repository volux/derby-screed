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

Block.prototype.init = function () {

  //console.log(this.getName(), this.getRole());
};

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
 *
 * @returns {boolean}
 */
Block.prototype.isContentIsListOrHeap = function () {

  var contentType = this.getContentType();

  return !!(contentType === 'list' || contentType === 'heap');
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
  wrapper[this.getName()] = this.model['getDeepCopy']('data');
  return wrapper;
};

/**
 *
 * @returns {Array|Object}
 */
Block.prototype.getChildrenDataCopy = function () {

  return this.model['getDeepCopy']('data');
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

  return this.model['getDeepCopy']('blank');
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

