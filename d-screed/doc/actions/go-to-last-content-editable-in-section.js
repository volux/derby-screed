module.exports = function (event) {

  var context = event.context;

  if (context && context.el) {

    if (context.el.parent.isContentType('list')) {

      context.el.parent.getLastChild()
        .focus();
      return false;
    }
  }
  return true;
};