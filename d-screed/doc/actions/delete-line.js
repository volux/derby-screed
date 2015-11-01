module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      var editables = this.getEditablesInContext(context);
      if (editables.length === 1) {

        return context.el.isContentInput();
      }
      this.removeSelectedEditables(editables, true, function (lastEl) {

        if (lastEl.isContentInput()) {

          lastEl.setDataText('');
        }
        if (!lastEl.glueWithPrevious()) {

          editables[0].el.moveCursorTo(editables[0]['start']);
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