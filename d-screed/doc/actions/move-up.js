module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var elIndex = context.el.getIndex();

    if (context.el.parent.isContentType(['form', 'table'])) {

      var section = context.el.getSection();
      var sectionIndex = section.getIndex();

      if (sectionIndex > 0) {

        context.el.blur();

        var parentId = context.el.parent.id;
        var parentIndex = context.el.parent.getIndex();
        var sectionId = section.id;
        var newParent;
        var movedSection = section.move(sectionIndex - 1);

        if (parentId !== sectionId) {

          newParent = movedSection.getChild(parentIndex);

        } else {

          newParent = movedSection;
        }
        newParent.getChild(elIndex).moveCursorTo(context.selection.focusOffset);
      }
      return false;
    }
    if (context.el.parent.isContentType('list')) {

      if (elIndex > 0) {

        context.el.move(elIndex - 1).moveCursorTo(context.selection.focusOffset);
      }
    }
  }
  return false;
};