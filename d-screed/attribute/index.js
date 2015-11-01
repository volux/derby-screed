/**
 *
 * @type {Attribute}
 */
var Attribute = require('../../lib/prototype/attribute');

/**
 *
 * @type {ScreedAttr|Attribute}
 */
module.exports = ScreedAttr;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedAttr
 * @constructor
 */
function ScreedAttr() {
}

/**
 *
 * @type {Attribute.prototype}
 */
ScreedAttr.prototype = Object.create(Attribute.prototype);

ScreedAttr.prototype.view = __dirname;
ScreedAttr.prototype.name = 'd-screed-attr';
