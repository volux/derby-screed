/**
 *
 * @type {Line}
 */
var Line = require('../../lib/prototype/line');

/**
 *
 * @type {ScreedLine|Line}
 */
module.exports = ScreedLine;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedLine
 * @constructor
 */
function ScreedLine() {
}

/**
 *
 * @type {Line.prototype}
 */
ScreedLine.prototype = Object.create(Line.prototype);

ScreedLine.prototype.view = __dirname;
ScreedLine.prototype.name = 'd-screed-line';
