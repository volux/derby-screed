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

          if (context.el.parent.isContentIsListOrHeap()) {

            if (!context.el.getDataText().length) {

              context.el.remove();
            }

          } else {

            if (context.el.getIndex() === 0 && !context.el.parent.toString().length) {

              context.el.parent.remove();
            }
          }
        }
      }
      return false;
    }
    return context.selection.focusOffset !== 0;
  }
  return false;
};