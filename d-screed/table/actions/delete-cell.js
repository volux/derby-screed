module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var prevCell = context.el.parent.getChild(context.el.getIndex() - 1);

    if (!prevCell) {

      var prevRow = context.el.parent.getPrevComponent();

      if (!prevRow) {

        return false;
      }
      prevCell = prevRow.getLastChild();

      if (prevCell) {

        prevCell.moveCursorTo(context.selection.focusOffset);
        if (context.el.parent.getChildrenCount() === 1) {

          context.el.parent.remove();
          return false;
        }
      }
    }
    context.el.remove(function () {
      prevCell.moveCursorTo(context.selection.focusOffset);
    });
  }
  return false;
};