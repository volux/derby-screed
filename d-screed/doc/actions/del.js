module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      var editables = this.getEditablesInContext(context);
      if (editables.length === 1) {

        return context.el.isContentInput();
      }
      this.removeSelectedEditables(editables, false, function (firstEl) {

        if (!firstEl.glueWithNext()) {

          firstEl.moveCursorTo(editables[0]['start']);
        }
      });

      return false;
    }

    var text = context.el.getDataText();

    if (context.selection.focusOffset === text.length) {

      context.el.glueWithNext();
      return false;
    }
    if (context.el.isContentInput()) {

      return context.selection.focusOffset !== text.length;
    }
  }
  return false;
};