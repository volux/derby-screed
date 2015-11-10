module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      var lastEl = this.removeSelectedEditables(context.selected, true);

      if (context.selected.length > 1) {

        lastEl.moveCursorTo(0);
        return false;
      }
    }

    var section = context.el.getSection();

    if (section.isContentMerge(false)) {

      if (!context.el.nextEditableFocus()) {

        context.el.prependBlankChildInNextBlock();
      }
      return false;
    }

    var caret = (context.selected) ? context.selected[0]['start'] : context.selection.focusOffset;

    if (context.el.parent.isContentType(['form','table'])) {

      if (context.el.parent.isContentMerge(false)) {

        context.el.prependBlankChildInNextBlock();

      } else {

        if (caret === context.el.getDataText().length) {

          context.el.parent.after(context.el.parent.getBlankData())
            .getFirstChild()
            .focus();

        } else {

          context.el.newLineAfterCaret(caret, function () {
            context.el.nextEditableFocus();
          })
        }
      }
      return false;
    }
    if (context.el.parent.isContentType('list')) {

      context.el.newLineAfterCaret(caret, function () {
        context.el.getNextComponent().focus();
      })

    }
  }
  return false;
};