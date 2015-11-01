/**
 *
 * @type {Doc}
 */
var Doc = require('../../lib/prototype/doc');

/**
 *
 * @type {ScreedDoc|Doc}
 */
module.exports = ScreedDoc;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedDoc
 * @constructor
 */
function ScreedDoc() {
}

/**
 *
 * @type {Doc.prototype}
 */
ScreedDoc.prototype = Object.create(Doc.prototype);

ScreedDoc.prototype.view = __dirname;
ScreedDoc.prototype.name = 'd-screed-doc';

/**
 *
 */
ScreedDoc.prototype.setShortcuts = function () {

  this.shortcuts = require('./shortcuts');
};
