module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.parent.isContentType('list')) {

      // TODO use selection
      if (!context.selection.isCollapsed) {

        console.log(context.selected);

      } else {

        context.el.after(context.el.getDataCopy(), function () {
          context.el.getNextComponent().moveCursorTo(context.selection.focusOffset);
        })
      }
      return false;
    }
    var section = context.el.getSection();

    if (!section.parent.isContentType('heap')) {

      return false;
    }
    section.after(section.getDataCopy(), function () {
      // TODO universal parent level; maybe section === block
      if (section.id == context.el.parent.id) {

        section.getNextComponent()
          .getChild(context.el.getIndex()) // editable
          .moveCursorTo(context.selection.focusOffset);
      } else {

        section.getNextComponent()
          .getChild(0) // block
          .getChild(context.el.getIndex()) // editable
          .moveCursorTo(context.selection.focusOffset);
      }
    })

  }
  return false;
};