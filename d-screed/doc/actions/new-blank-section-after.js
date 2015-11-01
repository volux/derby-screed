module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (!section.parent.isContentType('heap')) {

      return false;
    }
    // TODO section.getFirstEditable()
    section.after(section.getBlankData())
      .getFirstChild()
        .getFirstChild()
          .focus();
  }
  return false;
};