/**
 *
 * @type {Cell}
 */
var Cell = require('../../lib/prototype/cell');

/**
 *
 * @type {ScreedTD|Cell|*}
 */
module.exports = ScreedTD;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedTD
 * @constructor
 */
function ScreedTD() {
}

/**
 *
 * @type {Cell.prototype}
 */
ScreedTD.prototype = Object.create(Cell.prototype);

ScreedTD.prototype.view = __dirname;
ScreedTD.prototype.name = 'd-screed-td';
