// like a Attribute in DOM
/**
 *
 * @type {Base}
 */
var Base = require('./base');

/**
 *
 * @type {Attribute|Base}
 */
module.exports = Attribute;

/**
 * @class Attribute
 */
function Attribute() {
}

/**
 *
 * @type {Base.prototype}
 */
Attribute.prototype = Object.create(Base.prototype);

Attribute.prototype.init = function () {

  this.dataName = this.getName();
  setTimeout(function () {

    this.parent.addDataAttribute(this);
  }.bind(this), 0);

};

/**
 *
 * @returns {Object}
 */
Attribute.prototype.getData = function () {

  var data = {};
  data['name'] = this.dataName;
  data['value'] = this.scope();
  return data;
};

/**
 *
 * @returns {number|string}
 */
Attribute.prototype.getValue = function () {

  return this.model.get('data');
};

/**
 *
 * @param value {number|string}
 * @param [cbFn] {Function}
 * @returns {Base}
 */
Attribute.prototype.setValue = function (value, cbFn) {

  return this.setData(value, cbFn);
};

/**
 * TODO Future method
 * @param otherAttribute {Attribute}
 * @param [cbFn] {Function}
 * @returns {boolean}
 */
Attribute.prototype.merge = function (otherAttribute, cbFn) {

  if (!otherAttribute) {

    return true;
  }
  switch (this.getContentMerge()) {

    case 'sum':

      this.setValue(this.getValue() + otherAttribute.getValue(), cbFn);
      break;
  }
  return true;
};
