module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      if (context.selected.length === 1) {

        return context.el.isContentInput();
      }
      this.removeSelectedEditables(context.selected, false, function (firstEl) {

        if (!firstEl.glueWithNext()) {

          firstEl.moveCursorTo(context.selected[0].start);
        }
      });

      return false;
    }

    var text = context.el.getDataText();

    if (context.selection.focusOffset === text.length) {

      context.el.glueWithNext();
      return false;
    }

    return context.selection.focusOffset !== text.length;
  }
  return false;
};