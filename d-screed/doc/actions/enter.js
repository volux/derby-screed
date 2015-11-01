module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      var editables = this.getEditablesInContext(context);
      var lastEl = this.removeSelectedEditables(editables, true);

      if (editables.length > 1) {

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

    var caret = (editables) ? editables[0]['start'] : context.selection.focusOffset;

    if (context.el.parent.isContentType('form')) {

      context.el.prependBlankChildInNextBlock();
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