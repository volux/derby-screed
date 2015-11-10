module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (section) {

      section.parent.getFirstChild()
        .getFirstChild()
          .focus();
      return false;
    }
  }
  return true;
};