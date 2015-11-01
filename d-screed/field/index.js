/**
 *
 * @type {Field}
 */
var Field = require('../../lib/prototype/field');

/**
 *
 * @type {ScreedField|Field}
 */
module.exports = ScreedField;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedField
 * @constructor
 */
function ScreedField() {
}

/**
 *
 * @type {Field.prototype}
 */
ScreedField.prototype = Object.create(Field.prototype);

ScreedField.prototype.view = __dirname;
ScreedField.prototype.name = 'd-screed-field';
