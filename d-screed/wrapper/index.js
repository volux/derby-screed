/**
 *
 * @type {Wrapper}
 */
var Wrapper = require('../../lib/prototype/wrapper');

/**
 *
 * @type {ScreedWrapper|Wrapper}
 */
module.exports = ScreedWrapper;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedWrapper
 * @constructor
 */
function ScreedWrapper() {
}

/**
 *
 * @type {Wrapper.prototype}
 */
ScreedWrapper.prototype = Object.create(Wrapper.prototype);

ScreedWrapper.prototype.view = __dirname;
ScreedWrapper.prototype.name = 'd-screed-wrapper';
