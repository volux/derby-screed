/**
 *
 * @type {Section}
 */
var Section = require('../../lib/prototype/section');

/**
 *
 * @type {ScreedTR|Section}
 */
module.exports = ScreedTR;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedTR
 * @constructor
 */
function ScreedTR() {
}

/**
 *
 * @type {Section.prototype}
 */
ScreedTR.prototype = Object.create(Section.prototype);

ScreedTR.prototype.view = __dirname;
ScreedTR.prototype.name = 'd-screed-tr';
