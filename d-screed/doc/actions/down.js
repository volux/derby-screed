module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.isInline) {

      var nextEditable = context.el.getNextBlockEditable();

      if (!(nextEditable && nextEditable.isVisible())) {

        return true;
      }
      if (nextEditable.getBeforeSymbolsCount) {

        nextEditable.moveCursorTo(context.selection.focusOffset);

      } else {

        nextEditable.moveCursorTo(context.el.getBeforeSymbolsCount() + context.selection.focusOffset);
      }

      return false;
    }
    if (context.el.isCell) {

      var nextRow = context.el.parent.getNextComponent();

      if (!nextRow) {

        return false;
      }
      var sameCell = nextRow.getChild(context.el.getIndex());

      if (!(sameCell && sameCell.isVisible())) {

        return false;
      }
      sameCell.moveCursorTo(context.selection.focusOffset);

      return false;
    }
    return true;
  }
  return false;
};