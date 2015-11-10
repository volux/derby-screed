module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (!section.parent.isContentType('heap')) {

      return false;
    }
    section.after(section.getBlankData()).getFirstEditable().focus();
  }
  return false;
};