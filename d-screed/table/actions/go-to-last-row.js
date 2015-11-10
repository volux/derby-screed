module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (section) {

      section.parent.getLastChild()
        .getLastChild()
          .focus();
      return false;
    }
  }
  return true;
};