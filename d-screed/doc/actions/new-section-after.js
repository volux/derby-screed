module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (!section.parent.isContentType('heap')) {

      return false;
    }

    var editables = this.getEditablesInContext(context);
    this.removeSelectedEditables(editables, true, function (lastEl) {

      if (1 === editables.length) {

        context.el.newLineAfterCaret(editables[0]['start']);

      } else {

        lastEl.moveCursorTo(editables[0]['start']);
      }
    });


    var sectionDataCopy = section.getDataCopy();
    var parentName = context.el.parent.getName();

    if (context.el.parent.isContentType('form')) {

      sectionDataCopy = section.getBlankData();
      sectionDataCopy[section.getName()][parentName] = context.el.parent.getChildrenDataCopy();
      section.before(sectionDataCopy);

      return false;
    }
    if (context.el.parent.isContentType('list')) {

      var elIndex = context.el.getIndex();
      var fromNext = elIndex + 1;

      sectionDataCopy[section.getName()][parentName] = context.el.parent
        .fillContentData(context.el.parent.removeChildren(fromNext), context.el.getPlaceholder());

      if (0 === context.selection.focusOffset && elIndex > 0) {

        context.el.remove();
      }
      // TODO section.getFirstEditable()
      section.after(sectionDataCopy)
        .getFirstChild()
          .getFirstChild()
            .focus();
    }
  }
  return false;
};