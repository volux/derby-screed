module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var currentSection = context.el.getSection();

    if (!currentSection) {

      return false;
    }
    if (!currentSection.parent.isContentType('heap')) {

      return false;
    }

    var prevSection = currentSection.getPrevComponent();

    if (!prevSection) {

      return false;
    }
    if (!context.el.parent.isContentType('list')) {

      var prevSectionLastEditable = context.el.prevEditableFocus();

      if (prevSectionLastEditable) {

        this.fireActionOn(prevSectionLastEditable, 'mod+del');
      }
      return false;
    }

    var prevSameBlock = prevSection.getChild(context.el.parent.getIndex());
    // TODO prevSection.merge(currentSection);
    // TODO it mean: add or merge to prevSection other blocks in currentSection
    // TODO (for example attach, synopsis) and sum timer
    var from = prevSameBlock.appendChildren(
      context.el.parent.getChildrenDataCopy()
    );
    var appendedChild = prevSameBlock.getChild(from + context.el.getIndex());

    if (appendedChild) {

      appendedChild.moveCursorTo(context.selection.focusOffset);
    }
    currentSection.remove();
  }
  return false;
};