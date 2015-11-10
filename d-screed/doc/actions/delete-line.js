module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      if (context.selected.length === 1) {

        return context.el.isContentInput();
      }
      this.removeSelectedEditables(context.selected, true, function (lastEl) {

        if (lastEl.isContentInput()) {

          lastEl.setDataText('');
        }
        if (!lastEl.glueWithPrevious()) {

          this.parent.getComponentByPath(context.selected[0].path).moveCursorTo(context.selected[0].start);
        }
      });

      return false;
    }
    if (context.el.isContentInput()) {

      context.el.setDataText('', false, function () {

        if (!this.glueWithPrevious()) {

          if (this.prevEditableFocus()) {

            if (this.parent.isContentIsListOrHeap()) {

              this.remove();
            }
          }
        }
      }.bind(context.el));

    } else {

      context.el.moveCursorTo(context.selection.focusOffset);
    }
  }
  return false;
};