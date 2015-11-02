module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var editables = [];

    if (!context.selection.isCollapsed) {

      editables = this.getEditablesInContext(context);
      var firstEl = this.removeSelectedEditables(editables, false);

      if (editables.length > 1) {

        firstEl.moveCursorTo('end');
        return false;
      }
    }

    var section = context.el.getSection();

    if (section.isContentMerge(false)) {

      context.el.nextEditableFocus();
      return false;
    }

    var cursorPosition = (editables.length) ? editables[0]['start'] : context.selection.focusOffset;

    if (context.el.parent.isContentType('form')) {

      var nextBlock = context.el.parent.getNextComponent();

      if (nextBlock) {

        context.el.moveCursorTo(cursorPosition);
        nextBlock.insertBlankChild(0);

      } else {

        if (!context.el.parent.isContentMerge(false)) {

          context.el.moveCursorTo(cursorPosition);
          context.el.parent.after(context.el.parent.getBlankData());
        }
      }

      return false;
    }
    if (context.el.parent.isContentType('list')) {

      context.el.newLineAfterCaret(cursorPosition, function () {

        context.el.moveCursorTo(cursorPosition);
      });
    }
  }
  return false;
};