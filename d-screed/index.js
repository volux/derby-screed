/**
 *
 * @type {Screed}
 */
var Screed = require('../lib/prototype/screed');
/**
 *
 * @type {ScreedWidget|Screed}
 */
module.exports = ScreedWidget;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedWidget
 * @constructor
 */
function ScreedWidget() {
}

/**
 *
 * @type {Screed.prototype}
 */
ScreedWidget.prototype = Object.create(Screed.prototype);

ScreedWidget.prototype.view = __dirname;
ScreedWidget.prototype.name = 'd-screed';

