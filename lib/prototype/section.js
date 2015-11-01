/**
 *
 * @type {Block}
 */
var Block = require('./block');

/**
 *
 * @type {Section|Block}
 */
module.exports = Section;

/**
 * @class Section
 */
function Section() {
}

/**
 *
 * @type {Block.prototype}
 */
Section.prototype = Object.create(Block.prototype);
