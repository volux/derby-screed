/**
 *
 * @type {Section}
 */
var Section = require('./section');

/**
 *
 * @type {Wrapper|Section}
 */
module.exports = Wrapper;

/**
 * @class Wrapper
 */
function Wrapper() {
}

/**
 *
 * @type {Section.prototype}
 */
Wrapper.prototype = Object.create(Section.prototype);

/**
 *
 * @returns {Element|Node}
 */
Wrapper.prototype.getNode = function () {

  return this.getFirstChild().getNode();
};

/**
 *
 * @returns {boolean}
 */
Wrapper.prototype.isVisible = function () {

  return this.getFirstChild().isVisible();
};


