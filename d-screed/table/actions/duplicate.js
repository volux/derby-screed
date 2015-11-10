module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

      if (!context.selection.isCollapsed) {

        // TODO duplicate used selection
        console.log(context.selected);

      } else {

        var section = context.el.getSection(); // row
        section.after(section.getDataCopy(), function () {
          section.getNextComponent()
              .getChild(context.el.getIndex()) // cell
                .moveCursorTo(context.selection.focusOffset);
        })
      }
  }
  return false;
};