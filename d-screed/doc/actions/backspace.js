module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      var editables = this.getEditablesInContext(context);
      if (editables.length === 1) {

        return context.el.isContentInput();
      }
      this.removeSelectedEditables(editables, true, function (lastEl) {

        if (!lastEl.glueWithPrevious()) {

          editables[0].el.moveCursorTo(editables[0]['start']);
        }
      });

      return false;
    }
    if (context.selection.focusOffset === 0) {

      if (!context.el.glueWithPrevious()) {

        if (context.el.prevEditableFocus()) {

          var text = context.el.getDataText();

          if (context.el.parent.isContentIsListOrHeap() && !text.length) {

            context.el.remove();
          }
        }
      }
      return false;
    }
    if (context.el.isContentInput()) {

      return context.selection.focusOffset !== 0;

    } else {

      context.el.moveCursorTo(context.selection.focusOffset-1);
    }
  }
  return false;
};