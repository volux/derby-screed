/**
 *
 * @type {Block}
 */
var Block = require('../../lib/prototype/block');

/**
 *
 * @type {ScreedBlock|Block}
 */
module.exports = ScreedBlock;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedBlock
 * @constructor
 */
function ScreedBlock() {
}

/**
 *
 * @type {Block.prototype}
 */
ScreedBlock.prototype = Object.create(Block.prototype);

ScreedBlock.prototype.view = __dirname;
ScreedBlock.prototype.name = 'd-screed-block';
