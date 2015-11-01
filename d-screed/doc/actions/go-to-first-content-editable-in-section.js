module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.parent.isContentType('list')) {

      context.el.parent.getFirstChild()
        .focus();
      return false;
    }
  }
  return true;
};