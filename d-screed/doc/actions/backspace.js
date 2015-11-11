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

          var firstEl = self.parent.getComponentByPath(context.selected[0].path);

          if (firstEl.getDataText() === '') {

            firstEl.blur().setNodeContent(firstEl.getPlaceholder());
          }
          firstEl.moveCursorTo(context.selected[0].start);
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