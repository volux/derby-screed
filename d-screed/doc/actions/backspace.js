module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      if (context.selected.length === 1) {

        return context.el.isContentInput();
      }

      var self = this;

      this.removeSelectedEditables(context.selected, true, function (lastEl) {

        if (!lastEl.glueWithPrevious()) {

          self.parent.getComponentByPath(context.selected[0].path).moveCursorTo(context.selected[0].start);

        } else {

          lastEl.focus();
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