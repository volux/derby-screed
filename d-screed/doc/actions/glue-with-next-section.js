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

    var nextSection = currentSection.getNextComponent();

    if (!nextSection) {

      return false;
    }
    if (!context.el.parent.isContentType('list')) {

      var nextBlockLastEditable = context.el.parent.getNextComponent().getLastChild();

      if (nextBlockLastEditable) {

        nextBlockLastEditable.moveCursorTo('end');
        this.fireActionOn(nextBlockLastEditable, 'mod+del');
      }
      return false;
    }

    // TODO currentSection.merge(nextSection);
    // TODO it mean: add or merge to currentSection other blocks in nextSection
    // TODO (for example attach, synopsis) and sum timer
    var nextSameBlock = nextSection.getChild(context.el.parent.getIndex());
    var from = context.el.parent.appendChildren(
      nextSameBlock.getChildrenDataCopy()
    );
    var appendedChild = context.el.parent.getChild(from);

    if (appendedChild) {

      appendedChild.focus();
    }
    nextSection.remove();
  }
  return false;
};