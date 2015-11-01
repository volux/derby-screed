/**
 *
 * @type {Typed}
 */
var Typed = require('../../lib/prototype/typed');

/**
 *
 * @type {ScreedTyped|Typed}
 */
module.exports = ScreedTyped;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedTyped
 * @constructor
 */
function ScreedTyped() {
}

/**
 *
 * @type {Typed.prototype}
 */
ScreedTyped.prototype = Object.create(Typed.prototype);

ScreedTyped.prototype.view = __dirname;
ScreedTyped.prototype.name = 'd-screed-typed';
