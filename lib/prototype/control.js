/**
 *
 * @type {Field}
 */
var Field = require('./field');

/**
 *
 * @type {Control|Field}
 */
module.exports = Control;

/**
 * Must be empty - DerbyJS rule
 * @class Control
 * @constructor
 */
function Control() {
}

/**
 *
 * @type {Field.prototype}
 */
Control.prototype = Object.create(Field.prototype);

Control.prototype.isControl = true;

Control.prototype.onClick = function () {

  this.model.set('data', !this.model.get('data'));
};

Control.prototype.init = function () {

  this.inFocus(false);
  var self = this;

  self.dataName = self.getName();

  self.model.on('change', 'data**', function () {

    self.replaceNodeContent(self.getDataText());

  });
};

/**
 * overwrite in component
 * @returns {string}
 */
Control.prototype.getDataText = function () {

  return '';
};

/**
 * overwrite in component
 * @returns {Control}
 */
Control.prototype.setDataText = function () {

  return this;
};

Control.prototype.toString = function () {

  return '';
};
