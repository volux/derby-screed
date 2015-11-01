/**
 *
 * @type {Block}
 */
var Block = require('./block');

/**
 *
 * @type {Form|Block}
 */
module.exports = Form;

/**
 * @class Form
 */
function Form() {
}

/**
 *
 * @type {Block.prototype}
 */
Form.prototype = Object.create(Block.prototype);
