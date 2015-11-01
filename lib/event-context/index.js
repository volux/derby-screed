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
     * @type {null|Base|Unit|Editable|Field|Line|Typed}
     */
    this.el = null;
    /**
     *
     * @type {null|Selection}
     */
    this.selection = null;

    return this;
  }

  this.el = component; // TODO this.target
  this.selection = component.getSelection();
  // TODO this.selected

  return this;
}
