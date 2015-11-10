/**
 *
 * @type {Doc}
 */
var Doc = require('../../lib/prototype/doc');

/**
 *
 * @type {ScreedTable}
 */
module.exports = ScreedTable;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedTable
 * @constructor
 */
function ScreedTable() {
}

/**
 *
 * @type {Doc.prototype}
 */
ScreedTable.prototype = Object.create(Doc.prototype);

ScreedTable.prototype.view = __dirname;
ScreedTable.prototype.name = 'd-screed-table';

ScreedTable.prototype.setShortcuts = function () {

  this.shortcuts = require('./shortcuts');
};

ScreedTable.prototype.onScroll = function (event) {

  this.parent.setScroll(event.target.scrollTop);
  this.getFirstChild().setScroll(event.target.scrollTop);
};
