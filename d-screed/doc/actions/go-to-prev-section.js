module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (section.getIndex() > 0) {

      // TODO section.getFirstEditable()
      section.getPrevComponent()
        .getFirstChild()
          .getFirstChild()
            .focus();

      return false;
    }
  }
  return true;
};