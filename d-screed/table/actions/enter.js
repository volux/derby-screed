module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (!context.selection.isCollapsed) {

      // TODO copy rule from Excel
      var lastEl = this.removeSelectedEditables(context.selected, true);

      if (context.selected.length > 1) {

        lastEl.moveCursorTo(0);
        return false;
      }
    }

    var cellsCountInBlankRow = context.el.parent.getChildrenBlankData().length;
    var cellsCountInCurrentRow = context.el.parent.getChildrenCount();

    if (cellsCountInBlankRow > cellsCountInCurrentRow) {

      context.el.parent.insertChildren(context.el.getIndex() + 1, context.el.getBlankData(), function () {
        context.el.nextEditableFocus();
      });
      return false;
    }
    if (!context.el.nextEditableFocus()) {

      this.getFirstChild().insertBlankChild(context.el.parent.getIndex() + 1, function () {
        context.el.nextEditableFocus();
      });
    }
  }
  return false;
};