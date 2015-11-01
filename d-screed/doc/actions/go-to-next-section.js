module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var nextSection = context.el.getSection().getNextComponent();

    if (nextSection) {

      // TODO section.getFirstEditable()
      nextSection.getFirstChild()
        .getFirstChild()
          .focus();

      return false;
    }
  }
  return true;
};