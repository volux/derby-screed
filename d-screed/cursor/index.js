/**
 *
 * @type {Cursor}
 */
var Cursor = require('../../lib/prototype/cursor');
/**
 *
 * @type {ScreedCursor}
 */
module.exports = ScreedCursor;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedCursor
 * @constructor
 */
function ScreedCursor() {
}

/**
 *
 * @type {Cursor.prototype}
 */
ScreedCursor.prototype = Object.create(Cursor.prototype);

ScreedCursor.prototype.view = __dirname;
ScreedCursor.prototype.name = 'd-screed-cursor';

