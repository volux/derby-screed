module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = this.getFirstChild();

    // TODO .isVisible() ???
    if (section) {

      // TODO section.getFirstEditable()
      section.getFirstChild()
        .getFirstChild()
          .focus();
      return false;
    }
  }
  return true;
};