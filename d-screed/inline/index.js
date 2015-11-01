/**
 *
 * @type {Inline}
 */
var Inline = require('../../lib/prototype/inline');

/**
 *
 * @type {ScreedInline|Inline}
 */
module.exports = ScreedInline;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedInline
 * @constructor
 */
function ScreedInline() {
}

/**
 *
 * @type {Inline.prototype}
 */
ScreedInline.prototype = Object.create(Inline.prototype);

ScreedInline.prototype.view = __dirname;
ScreedInline.prototype.name = 'd-screed-inline';
