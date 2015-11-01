/**
 *
 * @type {Cursors}
 */
var Cursors = require('../../lib/prototype/cursors');
/**
 *
 * @type {ScreedCursors}
 */
module.exports = ScreedCursors;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedCursors
 * @constructor
 */
function ScreedCursors() {
}

/**
 *
 * @type {Cursors.prototype}
 */
ScreedCursors.prototype = Object.create(Cursors.prototype);

ScreedCursors.prototype.view = __dirname;
ScreedCursors.prototype.name = 'd-screed-cursors';

