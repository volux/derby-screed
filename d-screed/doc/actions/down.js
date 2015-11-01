module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.getRole() === 'inline') {

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
    return true;
  }
  return false;
};