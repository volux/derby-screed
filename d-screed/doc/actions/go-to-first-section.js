module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection().parent.getFirstChild();

    // TODO .isVisible() ???
    if (section) {

      section.getFirstEditable().focus();
      return false;
    }
  }
  return true;
};