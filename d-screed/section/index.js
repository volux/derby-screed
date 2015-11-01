/**
 *
 * @type {Section}
 */
var Section = require('../../lib/prototype/section');

/**
 *
 * @type {ScreedSection|Section}
 */
module.exports = ScreedSection;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedSection
 * @constructor
 */
function ScreedSection() {
}

/**
 *
 * @type {Section.prototype}
 */
ScreedSection.prototype = Object.create(Section.prototype);

ScreedSection.prototype.view = __dirname;
ScreedSection.prototype.name = 'd-screed-section';
