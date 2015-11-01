// data: {name: value}
// type: scheme.role - may be 'text' or 'select' or 'check' or 'radio'
/**
 *
 * @type {Editable}
 */
var Editable = require('./editable');

/**
 *
 * @type {Field|Editable}
 */
module.exports = Field;

/**
 * @class Field
 */
function Field() {
}

/**
 *
 * @type {Editable.prototype}
 */
Field.prototype = Object.create(Editable.prototype);

Field.prototype.init = function () {

  //console.log(this.getName(), this.getRole());

  this.dataName = this.getName();

  this.model.on('change', 'data**', this.onChange.bind(this));
};

/**
 * exception for Field
 // * @param data {Array}
 // * @param [cbFn] {Function}
 * @returns {Base|Unit|Editable}
 */
Field.prototype.before = function (/*data, cbFn*/) {

  return this.getPrevComponent();
};

//Field.prototype.beforeCaret = function (/*data, cbFn*/) {
//
//  return this.before();
//};
/**
 * exception for Field
 // * @param caret {number}
 // * @param [cbFn] {Function}
 * @returns {Base|Unit|Editable}
 */
Field.prototype.after = function (/*caret, cbFn*/) {

  return this.getNextComponent();
};

/**
 * exception for Field
 // * @param caret {number}
 // * @param [cbFn] {Function}
 * @returns {Base|Unit|Editable}
 */
Field.prototype.newLineAfterCaret = function (/*caret, cbFn*/) {

  return this.after();
};
