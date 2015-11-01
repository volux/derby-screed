module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.getRole() === 'inline') {

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
    return true;
  }
  return false;
};