module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    var section = context.el.getSection();

    if (!section.parent.isContentType('heap')) {

      return false;
    }
    section.shiftData('level', -1);
  }
  return false;
};