module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.isInline) {

      var prevEditable = context.el.getPrevBlockEditable();

      if (!(prevEditable && prevEditable.isVisible())) {

        return true;
      }
      // TODO get prevEditable.symbolsPerColumn and calc orphan line length ???
      if (prevEditable.getBeforeSymbolsCount) {

        prevEditable.moveCursorTo(context.selection.focusOffset);

      } else {

        prevEditable.moveCursorTo(context.el.getBeforeSymbolsCount() + context.selection.focusOffset);
      }

      return false;
    }
    if (context.el.isCell) {

      var prevRow = context.el.parent.getPrevComponent();

      if (!prevRow) {

        return false;
      }
      var sameCell = prevRow.getChild(context.el.getIndex());

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