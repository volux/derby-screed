/**
 *
 * @type {EventContext}
 */
module.exports = EventContext;

/**
 *
 * @class EventContext
 * @param component {Base|Unit|Editable|Field|Line|Typed}
 * @returns {EventContext|Function}
 * @constructor
 */
function EventContext(component) {


  if (!component.isEventContext()) {

    /**
     *
     * @type {null|Base|Unit|Editable|Field|Line|Typed|*}
     */
    this.el = null;
    /**
     *
     * @type {null|Selection}
     */
    this.selection = null;
    /**
     *
     * @type {null|Array}
     */
    this.selected = null;

    return this;
  }

  this.el = component; // TODO this.target
  this.selection = component.getSelection();
  this.selected = component.getSelectedEditables(this.selection);

  return this;
}
