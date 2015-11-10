module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      // TODO copy rule from Excel
      var lastEl = this.removeSelectedEditables(context.selected, true);

      if (context.selected.length > 1) {

        lastEl.moveCursorTo(0);
        return false;
      }
    }

    this.getFirstChild().insertBlankChild(context.el.parent.getIndex() + 1);
  }
  return false;
};