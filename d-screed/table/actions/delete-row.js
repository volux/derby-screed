module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var prevRow = context.el.parent.getPrevComponent();

    if (!prevRow) {
      return false;
    }
    var prevCell = prevRow.getLastChild();

    if (prevCell) {

      //prevCell.moveCursorTo(context.selection.focusOffset);
      prevCell.moveCursorTo('end');
      context.el.parent.remove();
    }
  }
  return false;
};