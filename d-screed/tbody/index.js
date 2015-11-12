/**
 *
 * @type {Section}
 */
var Section = require('../../lib/prototype/section');

/**
 *
 * @type {ScreedTBody}
 */
module.exports = ScreedTBody;

/**
 * Must be empty - DerbyJS rule
 * @class ScreedTBody
 * @constructor
 */
function ScreedTBody() {
}

/**
 *
 * @type {Section.prototype}
 */
ScreedTBody.prototype = Object.create(Section.prototype);

ScreedTBody.prototype.view = __dirname;
ScreedTBody.prototype.name = 'd-screed-tbody';

ScreedTBody.prototype.init = function () {

  this.model.setNull('scroll', 0);
};

ScreedTBody.prototype.setScroll = function (scroll) {

  this.model.set('scroll', scroll);
};

ScreedTBody.prototype.getFields = function (data) {

  var fields = [];

  if (!data) return fields;

  var firstRow =  data[0];

  if (firstRow) {

    var firstRowItem = Object.keys(firstRow)[0];

    if (firstRowItem) {

      var props = firstRow[firstRowItem];

      fields = Object.keys(props);
    }
  }

  return fields;
};