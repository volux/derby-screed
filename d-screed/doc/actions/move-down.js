module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var elIndex = context.el.getIndex();

    if (context.el.parent.isContentType('form')) {

      var section = context.el.getSection();

      if (!section.parent.isContentType('heap')) {

        return false;
      }

      var sectionIndex = section.getIndex();

      if (sectionIndex > -1 && sectionIndex < section.parent.getChildrenCount() - 1) {

        context.el.blur();

        section.move(sectionIndex + 1)
          .getChild(context.el.parent.getIndex())
            .getChild(elIndex)
              .moveCursorTo(context.selection.focusOffset);
      }
      return false;
    }
    if (context.el.parent.isContentType('list')) {

      if (elIndex < context.el.parent.getChildrenCount() - 1) {

        context.el.move(elIndex + 1)
          .moveCursorTo(context.selection.focusOffset);
      }
    }

  }
  return false;
};